import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const validUser = username === this.configService.get('ADMIN_USER');
    const validPass = password === this.configService.get('ADMIN_PASSWORD');

    if (!validUser || !validPass) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const token = this.jwtService.sign({ username, role: 'admin' });
    return { access_token: token };
  }
}