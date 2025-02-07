import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../../entities/Users.entity';

@Injectable()
export class UserRepository {
  public async findByDocumentOrEmail({
    document,
    email,
  }: {
    document: string;
    email: string;
  }): Promise<UsersEntity> {
    return UsersEntity.findOne({
      where: [{ document }, { email }],
    });
  }
}
