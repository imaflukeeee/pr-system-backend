import { Injectable } from '@nestjs/common';
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
}
