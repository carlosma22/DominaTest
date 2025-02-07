import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UsersEntity } from '../../../entities/Users.entity';
import * as bcrypt from 'bcryptjs';
import { UserBodyDto } from '../dto/userBody.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dataObj: UserBodyDto): Promise<any> {
    try {
      const { document, firstName, lastName, email, password } = dataObj;
      const user = await this.findByDocumentOrEmail({
        document,
        email,
      });

      if (user) {
        throw new BadRequestException('The document or email already exists');
      }

      const cryptedPass = await bcrypt.hash(password, 10);
      await UsersEntity.create({
        document,
        firstName,
        lastName,
        email,
        password: cryptedPass,
      }).save();

      return {
        document,
        email,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByDocumentOrEmail({
    document,
    email,
  }: {
    document: string;
    email: string;
  }): Promise<UsersEntity> {
    return this.userRepository.findByDocumentOrEmail({
      document,
      email,
    });
  }
}
