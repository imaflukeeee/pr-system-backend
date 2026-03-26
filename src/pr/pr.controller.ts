import { Controller, Get, UseGuards, Req, Post, Body, Patch, Param } from '@nestjs/common';
import { PrService } from './pr.service';
import { JwtAuthGuard, JwtPayload } from '../auth/jwt.guard';
import { Request } from 'express';
import { CreatePrDto } from 'src/dto/create-pr.dto';
import { UpdatePrStatusDto } from 'src/dto/update-pr-status.dto';

@Controller('pr')
export class PrController {
  constructor(private readonly PrService: PrService) {}

  @UseGuards(JwtAuthGuard) // ต้องผ่าน JwtGuard ก่อนถึงจะสามารถสร้าง pr ได้
  @Post()
  async createPr(
    @Req() req: Request & { user: JwtPayload }, // ดึงข้อมูลคนเบิกจาก Jwt
    @Body() body: CreatePrDto // รับข้อมูล Pr จากที่ส่งมา
  ) {
    return this.PrService.createPr(Number(req.user.userID), body);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyPrs(@Req() req: Request & { user: JwtPayload }) {
    return this.PrService.getPrs(Number(req.user.userID));
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status') // กำหนด URL ให้เป็น /pr/เลข id/status
  async updatePrStatus(
    @Param('id') id:string, // ดึงเลข id จาก url
    @Body() body: UpdatePrStatusDto // ดึงสถานะใหม่มาจาก body
  ) {
    return this.PrService.updateStatus(Number(id), body.status);
  }
}
