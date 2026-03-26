import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from '../auth/auth.module';

@Global() // ใส่คำว่า Global เพื่อให้แผนกนี้เป็นส่วนกลาง ใครๆ ก็เรียกใช้ได้
@Module({
  imports: [AuthModule], // เรียกใช้งาน AuthMoudle
  providers: [PrismaService],
  exports: [PrismaService], // อนุญาตให้ (PrismaService) ไปใช้
})
export class PrismaModule {}
