import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto/auth.dto';
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
}
