import { Module } from '@nestjs/common';
import { PrService } from './pr.service';
import { PrController } from './pr.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [PrService, PrismaService],
  controllers: [PrController]
})
export class PrModule {}
