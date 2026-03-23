import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable() // Service สำหรับจัดการ Auth
export class AuthService {
  constructor(
    private prisma: PrismaService, // เข้าถึง User ใน Database
    private jwtService: JwtService, // สร้าง Token หลังจาก Login
  ) {}
  async register(email: string, pass: string) {
    // ฟังก์ชันสมัครสมาชิก (Register)
    const existingUser = await this.prisma.user.findUnique({
      // ตรวจสอบ Email User ใน Database เพื่อป้องกันการใช้ซ้ำ
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('อีเมลได้ถูกลงทะเบียนไปแล้ว');
    }
    const hashedPassword = await bcrypt.hash(pass, 10); // Hash Encrypt
    const newUser = await this.prisma.user.create({
      data: { email: email, password: hashedPassword }, // สร้าง User ใหม่ใน Database (Password ถูก Hash แล้ว)
    });
    return {
      message: 'ลงทะเบียนสำเร็จ',
      user: { email: newUser.email },
    };
  }
  async login(email: string, pass: string) {
    // ฟังก์ชันเข้าสู่ระบบ (Login)
    const user = await this.prisma.user.findUnique({ where: { email } }); // ตรวจสอบ User หรือ Password
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
    const payload = { userID: user.id, email: user.email }; // สร้าง payload เก็บ user ที่จำเป็น
    const token = this.jwtService.sign(payload); // สร้าง JWT Token
    return {
      message: 'เข้าสู่ระบบสำเร็จ',
      access_token: token,
    };
  }
}
