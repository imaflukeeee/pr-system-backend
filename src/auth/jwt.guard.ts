import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface JwtPayload {
  userID: string | number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // ดัก request ก่อนเข้าถึง API และใช้ CanActivate() อนุญาต / ปฏิเสธ request
  constructor(private jwtService: JwtService) {} // รับ jwtService มาใช้งานผ่าน Dependency Injection ใช้สำหรับ Verify และ Decode JWT Token

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Method หลักของ Guard ใช้ตัดสินว่าอนุญาตให้ Request ผ่านหรือไม่ (true = ผ่าน, false = ไม่ผ่าน)
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: any }>(); // แปลง ExecutionContext ให้เป็น HTTP context แล้วดึง request (req) ออกมา
    const token = this.extractTokenFromHeader(request); // เรียก function เพื่อดึง JWT token จาก header (เช่น Authorization: Bearer <token>)

    if (!token) {
      throw new UnauthorizedException('คุณไม่มีสิทธิ์เข้าถึง');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token); // ตรวจสอบว่าเป็นเจ้าของ Token หรือไม่
      request['user'] = payload; // แกะข้อมูลผู้ใช้เช่น (User ID , Email) ไปแปะไว้ใน request เพื่อให้ API เอาไปใช้ต่อได้
    } catch {
      throw new UnauthorizedException('Token ไม่ถูกต้องหรือหมดอายุ');
    }
    return true; // ปล่อยผ่านให้เข้าไปใช้งาน API ได้
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    // ฟังก์ชันดึง JWT token จาก header
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // แยกค่า Authorization เป็น type (Bearer) และ token โดยกันกรณี undefined
    return type == 'Bearer' ? token : undefined; // ถ้าเป็น Bearer ให้คืน token ไม่งั้นคืน undefined
  }
}
