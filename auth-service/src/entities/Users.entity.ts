import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'document', length: 20, unique: true })
  document: string;

  @Column('varchar', { name: 'firstName', length: 50 })
  firstName: string;

  @Column('varchar', { name: 'lastName', length: 50 })
  lastName: string;

  @Column('varchar', { name: 'email', length: 30, unique: true })
  email: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

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
}
