import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import { UsersEntity } from '../../../entities/Users.entity';
import * as bcrypt from 'bcryptjs';

import { InternalServerErrorException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByDocumentOrEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    it('should create a new user if document and email do not exist', async () => {
      jest.spyOn(userService, 'findByDocumentOrEmail').mockResolvedValue(null);
      const saveMock = jest
        .spyOn(UsersEntity, 'create')
        .mockReturnValue({ save: jest.fn().mockResolvedValue({}) } as any);

      const userDto = {
        document: '123456',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
      };

      const result = await userService.create(userDto);
      expect(result).toEqual({ document: '123456', email: 'john@example.com' });
      expect(saveMock).toHaveBeenCalled();
    });

    it('should throw BadRequestException if document or email already exists', async () => {
      (userRepository.findByDocumentOrEmail as jest.Mock).mockResolvedValue({
        id: 1,
      } as Partial<UsersEntity>);

      await expect(
        userService.create({
          document: '123456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest
        .spyOn(userService, 'findByDocumentOrEmail')
        .mockRejectedValue(new Error('Unexpected Error'));

      await expect(
        userService.create({
          document: '123456',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findByDocumentOrEmail', () => {
    it('should find user by document or email', async () => {
      const mockUser: Partial<UsersEntity> = {
        id: 1,
        document: '123456789',
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: await bcrypt.hash('password', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      (userRepository.findByDocumentOrEmail as jest.Mock).mockResolvedValue(
        mockUser,
      );

      const result = await userService.findByDocumentOrEmail({
        document: '123456',
        email: 'john@example.com',
      });

      expect(result).toEqual(mockUser);
    });

    it('should return null if user does not exist', async () => {
      jest
        .spyOn(userRepository, 'findByDocumentOrEmail')
        .mockResolvedValue(null);

      const result = await userService.findByDocumentOrEmail({
        document: '123456',
        email: 'john@example.com',
      });
      expect(result).toBeNull();
    });
  });
});
