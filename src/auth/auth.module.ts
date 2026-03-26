import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Module สำหรับ Authentication และ JWT configuration
@Module({
  imports: [
    // ตั้งค่า JWT โดยใช้ secret จาก .env
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService], // logic (login/register)
  controllers: [AuthController], // รับ request จาก client
  exports: [JwtModule], // exports JwtModule ให้เรียกใช้งานได้
})
export class AuthModule {}
