import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly redisService: RedisService
  ) {}

  async saveRefreshToken(token: string, userId: string): Promise<void> {
    await this.redisService.set(userId, token, 7 * 24 * 60 * 60);
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    await this.redisService.del(userId);
  }

  async isRefreshTokenValid(userId: string, token: string): Promise<boolean> {
    const storedToken = await this.redisService.get(userId);
    return storedToken === token;
  }

  async signin(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await this.userService.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.saveRefreshToken(refreshToken, user._id.toString());

    return { accessToken, refreshToken };
  }

  async revokeUserToken(userId: string): Promise<void> {
    await this.revokeRefreshToken(userId);
  }
}
