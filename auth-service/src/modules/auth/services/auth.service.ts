import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByDocumentOrEmail({
        document: email,
        email,
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const { ...result } = user;
        return result;
      }

      throw new BadRequestException('Invalid credentials');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async login(user: any) {
    try {
      const payload = { email: user.email, sub: user.id };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
