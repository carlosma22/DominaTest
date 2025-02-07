import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './Users.entity';
import { StatusEntity } from './Status.entity';

@Entity('UserTasks')
export class UserTasksEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'task', length: 50 })
  task: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('int', { name: 'statusId' })
  statusId: number;

  @Column('timestamp', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updatedAt',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  users: UsersEntity;

  @JoinColumn([{ name: 'statusId', referencedColumnName: 'id' }])
  status: StatusEntity;
}
