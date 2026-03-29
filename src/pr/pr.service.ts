import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrDto } from 'src/dto/create-pr.dto';

@Injectable()
export class PrService {
  constructor(private prisma: PrismaService) {}
  // สร้างรายการเบิก PR รับ userid fk กับ user
  // รับ dto ข้อมูล title และ amount
  async createPr(userId: number, dto: CreatePrDto) {
    return this.prisma.purchaseRequest.create({
      data: {
        title: dto.title,
        amount: dto.amount,
        user: {
          connect: { id: userId },
        },
      },
    });
  }
  async getPrs(userId: number) {
    return this.prisma.purchaseRequest.findMany({
      where: { userId: userId }, // ค้นหาเฉพาะใบ PR ของพนักงานคนนี้
      orderBy: { id: 'desc' }, // เรียงใบสั่งซื้อใหม่ล่าสุดไว้บนสุด
    });
  }
  // Function updateStatus PR
  async updateStatus(id: number, status: string) {
    return this.prisma.purchaseRequest.update({
      where: { id: id }, // ค้นหาใบ PR จาก (id)
      data: { status: status }, // สั่งเปลี่ยนค่า status ใน table
    });
  }
  async deletePr(id: number, userId: number) {
    const pr = await this.prisma.purchaseRequest.findFirst({ // หาดูก่อนว่ามีใบ PR นี้ และเป็นของ User คนนี้ไหม
      where: { id: id, userId: userId },
    });
    if (!pr) { // ถ้าไม่เจอ หรือไม่ใช่เจ้าของ
      throw new ForbiddenException(
        'ไม่พบรายการนี้หรือคุณไม่มีสิทธิ์ลบรายการนี้',
      );
    }
    if (pr.status !== 'Pending') { // ถ้าไม่ใช่สถานะ Pending ห้ามลบ (ถ้าเป็น Approved หรือ Rejected จะไม่สามารถลบได้)
      throw new ForbiddenException('ไม่สามารถลบรายการที่ผ่านการพิจารณาแล้วได้');
    }
    return await this.prisma.purchaseRequest.delete({ // ตรวจสอบถ้าเป็นเจ้า PR จะสั่งลบได้
      where: { id: id },
    });
  }
  async findAllPrs() { // ฟังก์ชันค้นหาใบ pr ทั้งหมด
    return await this.prisma.purchaseRequest.findMany({
      include: {
        user: {
          select: { email: true } // ดึง Email user ที่สร้าง pr มาแวดง
        }
      },
      orderBy: { id: 'desc' } // เรียงจากรายการล่าสุดขึ้นก่อน
    })
  }
}
