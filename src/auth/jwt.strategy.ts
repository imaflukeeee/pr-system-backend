import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // user บน header แบบ BearerToken
      ignoreExpiration: false, // ถ้า BearerToken หมดอายุให้กลับไป Login ใหม่
      secretOrKey: configService.get<string>('JWT_SECRET')!, // ดึงค่า JWT_Token จาก .env
    });
  }

  async validate(payload: any) { // ถ้า token ถูกจะดึงข้อมูลใน payload
    return { userId: payload.sub, email: payload.email, role: 'Purchasing Admin' }; // นำข้อมูลจาก token (payload) มาจัดรูปใหม่ แล้วส่งไปเก็บใน req.user ไปใช้งานต่อใน controller
  }
}