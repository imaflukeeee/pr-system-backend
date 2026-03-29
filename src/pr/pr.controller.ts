import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { JwtAuthGuard, JwtPayload } from '../auth/jwt.guard';
import { Request } from 'express';
import { CreatePrDto } from 'src/dto/create-pr.dto';
import { UpdatePrStatusDto } from 'src/dto/update-pr-status.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';

@Controller('pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  @UseGuards(JwtAuthGuard) // ต้องผ่าน JwtGuard ก่อนถึงจะสามารถสร้าง pr ได้
  @Post()
  async createPr(
    @Req() req: Request & { user: JwtPayload }, // ดึงข้อมูลคนเบิกจาก Jwt
    @Body() body: CreatePrDto, // รับข้อมูล Pr จากที่ส่งมา
  ) {
    return await this.prService.createPr(Number(req.user.userID), body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyPrs(@Req() req: Request & { user: JwtPayload }) {
    return await this.prService.getPrs(Number(req.user.userID));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id/status') // กำหนด URL ให้เป็น /pr/เลข id/status
  async updatePrStatus(
    @Param('id') id: string, // ดึงเลข id จาก url
    @Body() body: UpdatePrStatusDto, // ดึงสถานะใหม่มาจาก body
  ) {
    return await this.prService.updateStatus(Number(id), body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePr(
    @Param('id') id: string,
    @Req() req: Request & { user: JwtPayload },
  ) {
    // ลบ id (เลขใบ pr) ของ userID
    return await this.prService.deletePr(Number(id), Number(req.user.userID));
  }
}
