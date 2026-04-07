// 👇 แก้ไขบรรทัดนี้: เติม Get, UseGuards, Request เข้ามาด้วยครับ
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

// Controller Auth (register / login)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Post auth/register
  async register(@Body() body: AuthDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login') // Post auth/login
  async login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard('jwt')) // ต้องมี Token ถึงจะผ่านได้
  @Get('profile')
  getProfile(@Request() req) { // ถ้าข้อมูลถูก token ถูกต้องจะดึงข้อมูลจาก jwt.strategy มารวมใน req.user เพื่อรอใช้งานและส่งไป front-end เพื่อรอเรียกใช้งาน
    return req.user; 
  }
}