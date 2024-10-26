import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() { email, password }: { email: string; password: string }) {
    return this.authService.signin(email, password);
  }

  @Post('revoke-refresh-token')
  @UseGuards(JwtAuthGuard)
  async revokeRefreshToken(@Request() req) {
    await this.authService.revokeUserToken(req.user.userId);
    return { message: 'Refresh token revoked successfully' };
  }
}
