import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ใส่คำว่า Global เพื่อให้แผนกนี้เป็นส่วนกลาง ใครๆ ก็เรียกใช้ได้
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // อนุญาตให้แผนกอื่นยืมตัวพนักงาน (PrismaService) ไปใช้
})
export class PrismaModule {}
