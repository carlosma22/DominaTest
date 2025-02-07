import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/services/user.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { UsersEntity } from 'src/entities/Users.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByDocumentOrEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should validate user credentials successfully', async () => {
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

      (userService.findByDocumentOrEmail as jest.Mock).mockResolvedValue(
        mockUser,
      );
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException for invalid credentials', async () => {
      jest.spyOn(userService, 'findByDocumentOrEmail').mockResolvedValue(null);

      await expect(
        authService.validateUser('invalid@example.com', 'wrongpassword'),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest
        .spyOn(userService, 'findByDocumentOrEmail')
        .mockRejectedValue(new Error('Unexpected Error'));

      await expect(
        authService.validateUser('test@example.com', 'password'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const mockUser = { email: 'test@example.com', id: 1 };
      const mockToken = 'jwt-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.login(mockUser);
      expect(result).toEqual({ token: mockToken });
    });

    it('should throw InternalServerErrorException on error', async () => {
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error('JWT Error');
      });

      await expect(
        authService.login({ email: 'test@example.com', id: 1 }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
