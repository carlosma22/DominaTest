import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { StatusEntity } from '../../../entities/Status.entity';
import { UsersEntity } from '../../../entities/Users.entity';
import { UserTasksEntity } from '../../../entities/UserTasks.entity';
import { DataSource } from 'typeorm';
import { FindResponseDTO } from '../dto/findResponse.dto';

@Injectable()
export class UserTaskRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async userTaskFindById(id: number): Promise<UserTasksEntity> {
    return UserTasksEntity.findOne({ where: { id } });
  }

  public async userFindById(id: number): Promise<UsersEntity> {
    return UsersEntity.findOne({ where: { id } });
  }

  public async statusFindById(id: number): Promise<StatusEntity> {
    return StatusEntity.findOne({ where: { id } });
  }

  public async createUserTask(dataObj: object): Promise<any> {
    return UserTasksEntity.create(dataObj).save();
  }

  public async updateUserTask(id: number, dataObj: object): Promise<any> {
    return UserTasksEntity.update({ id }, dataObj);
  }

  public async findById(id: number): Promise<FindResponseDTO> {
    const sqlQuery = `
      SELECT 
        ut.task, 
        CONCAT(u.firstName, ' ', u.lastName) userName,
        s.name statusName,
        ut.createdAt,
        ut.updatedAt
      FROM UserTasks ut 
      JOIN Users u ON u.id = ut.userId
      JOIN Status s ON s.id = ut.statusId 
      WHERE ut.id = ?
    `;

    const result = await this.dataSource.query(sqlQuery, [id]);
    return plainToClass(FindResponseDTO, result);
  }

  public async findAll(): Promise<any> {
    const sqlQuery = `
      SELECT 
        ut.task, 
        CONCAT(u.firstName, ' ', u.lastName) userName,
        s.name statusName,
        ut.createdAt,
        ut.updatedAt
      FROM UserTasks ut 
      JOIN Users u ON u.id = ut.userId
      JOIN Status s ON s.id = ut.statusId
    `;

    const result = await this.dataSource.query(sqlQuery);
    return plainToClass(FindResponseDTO, result);
  }

  public async deleteById(id: number): Promise<any> {
    return UserTasksEntity.delete({ id });
  }
}
