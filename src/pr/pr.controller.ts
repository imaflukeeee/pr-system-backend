import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { PrService } from './pr.service';
import { JwtAuthGuard, JwtPayload } from '../auth/jwt.guard';
import { Request } from 'express';

@Controller('pr')
export class PrController {
  constructor(private readonly PrService: PrService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPrInfo(@Req() req: Request & { user: JwtPayload }) {
    return {
      message: 'ยินดีต้อนรับเข้าสู่ระบบ Purchase Request !',
      your_info: req.user,
    };
  }
}
