import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool as any);
    super({ adapter });
  }

  // ฟังก์ชันนี้จะทำงานอัตโนมัติตอนที่เปิดเซิร์ฟเวอร์
  async onModuleInit() {
    await this.$connect();
    console.log('✅ เชื่อมต่อ Database สำเร็จแล้ว!');
  }

  // ฟังก์ชันนี้จะทำงานอัตโนมัติตอนที่ปิดเซิร์ฟเวอร์
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
