import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [ // import JWT ดึง secret key จาก .env มาใช้งาน
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // fallback_secret ไว้กัน undefined
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // token มีอายุ 1 วัน
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule], 
})
export class AuthModule {}