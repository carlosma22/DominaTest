import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserTaskRepository } from '../repositories/userTask.repository';
import { UserTasksEntity } from '../../../entities/UserTasks.entity';
import { UsersEntity } from '../../../entities/Users.entity';
import { StatusEntity } from '../../../entities/Status.entity';
import { CreateBodyDto } from '../dto/createBody.dto';
import { UpdateBodyDto } from '../dto/updateBody.dto';
import { FindResponseDTO } from '../dto/findResponse.dto';

@Injectable()
export class UserTaskService {
  constructor(private userTaskRepository: UserTaskRepository) {}

  async create(dataObj: CreateBodyDto): Promise<any> {
    try {
      const { task, description, userId, statusId } = dataObj;
      const user = await this.userFindById(userId);
      if (!user) {
        throw new BadRequestException(
          `The user with ID ${userId} does not exist`,
        );
      }

      const status = await this.statusFindById(statusId);
      if (!status) {
        throw new BadRequestException(
          `The status with ID ${statusId} does not exist`,
        );
      }

      await this.createUserTask({ task, description, userId, statusId });

      return 'The task has been created';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(dataObj: UpdateBodyDto): Promise<any> {
    try {
      const { id, task, description, userId, statusId } = dataObj;

      const userTask = await this.userTaskFindById(id);
      if (!userTask) {
        throw new BadRequestException(`The Task with ID ${id} does not exist`);
      }

      const user = await this.userFindById(userId);
      if (!user) {
        throw new BadRequestException(
          `The user with ID ${userId} does not exist`,
        );
      }

      const status = await this.statusFindById(statusId);
      if (!status) {
        throw new BadRequestException(
          `The status with ID ${statusId} does not exist`,
        );
      }

      await this.updateUserTask(id, { task, description, userId, statusId });

      return 'The task has been updated';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findById(taskId): Promise<FindResponseDTO> {
    try {
      return this.userTaskRepository.findById(taskId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<any> {
    try {
      return this.userTaskRepository.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteById(taskId): Promise<any> {
    try {
      return this.userTaskRepository.deleteById(taskId);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async userTaskFindById(id: number): Promise<UserTasksEntity> {
    return this.userTaskRepository.userTaskFindById(id);
  }

  async userFindById(id: number): Promise<UsersEntity> {
    return this.userTaskRepository.userFindById(id);
  }

  async statusFindById(id: number): Promise<StatusEntity> {
    return this.userTaskRepository.statusFindById(id);
  }

  async createUserTask(dataObj: object): Promise<UserTasksEntity> {
    return this.userTaskRepository.createUserTask(dataObj);
  }

  async updateUserTask(id: number, dataObj: object): Promise<UserTasksEntity> {
    return this.userTaskRepository.updateUserTask(id, dataObj);
  }
}
