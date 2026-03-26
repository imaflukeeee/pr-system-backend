import { Module } from '@nestjs/common';
import { PrService } from './pr.service';
import { PrController } from './pr.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PrService],
  controllers: [PrController]
})
export class PrModule {}
