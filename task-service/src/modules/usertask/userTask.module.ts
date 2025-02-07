import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTaskController } from './controllers/userTask.controller';
import { UserTaskService } from './services/userTask.service';
import { UserTaskRepository } from './repositories/userTask.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserTaskController],
  providers: [UserTaskService, UserTaskRepository],
  exports: [],
})
export class UserTaskmodule {}
