import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskService } from '../services/userTask.service';
import { UserTaskRepository } from '../repositories/userTask.repository';
import { InternalServerErrorException } from '@nestjs/common';

describe('UserTaskService', () => {
  let userTaskService: UserTaskService;
  let userTaskRepository: UserTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTaskService,
        {
          provide: UserTaskRepository,
          useValue: {
            userTaskFindById: jest.fn(),
            userFindById: jest.fn(),
            statusFindById: jest.fn(),
            createUserTask: jest.fn(),
            updateUserTask: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    userTaskService = module.get<UserTaskService>(UserTaskService);
    userTaskRepository = module.get<UserTaskRepository>(UserTaskRepository);
  });

  describe('create', () => {
    it('should create a task if user and status exist', async () => {
      const createDto = {
        task: 'Test Task',
        description: 'Task description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(userTaskRepository, 'statusFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(userTaskRepository, 'createUserTask')
        .mockResolvedValue({} as any);

      const result = await userTaskService.create(createDto);

      expect(result).toBe('The task has been created');
      expect(userTaskRepository.createUserTask).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const createDto = {
        task: 'Test Task',
        description: 'Task description',
        userId: 1,
        statusId: 1,
      };

      jest.spyOn(userTaskRepository, 'userFindById').mockResolvedValue(null);

      await expect(userTaskService.create(createDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    it('should throw BadRequestException if status does not exist', async () => {
      const createDto = {
        task: 'Test Task',
        description: 'Task description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest.spyOn(userTaskRepository, 'statusFindById').mockResolvedValue(null);

      await expect(userTaskService.create(createDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      const createDto = {
        task: 'Test Task',
        description: 'Task description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockRejectedValue(new Error('Unexpected error'));

      await expect(userTaskService.create(createDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update a task if user and status exist', async () => {
      const updateDto = {
        id: 1,
        task: 'Updated Task',
        description: 'Updated Description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userTaskFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(userTaskRepository, 'statusFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(userTaskRepository, 'updateUserTask')
        .mockResolvedValue({} as any);

      const result = await userTaskService.update(updateDto);

      expect(result).toBe('The task has been updated');
      expect(userTaskRepository.updateUserTask).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user does not exist during update', async () => {
      const updateDto = {
        id: 1,
        task: 'Updated Task',
        description: 'Updated Description',
        userId: 1,
        statusId: 1,
      };

      jest.spyOn(userTaskRepository, 'userFindById').mockResolvedValue(null);

      await expect(userTaskService.update(updateDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    it('should throw BadRequestException if status does not exist during update', async () => {
      const updateDto = {
        id: 1,
        task: 'Updated Task',
        description: 'Updated Description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockResolvedValue({ id: 1 } as any);
      jest.spyOn(userTaskRepository, 'statusFindById').mockResolvedValue(null);

      await expect(userTaskService.update(updateDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    it('should throw InternalServerErrorException on unexpected error during update', async () => {
      const updateDto = {
        id: 1,
        task: 'Updated Task',
        description: 'Updated Description',
        userId: 1,
        statusId: 1,
      };

      jest
        .spyOn(userTaskRepository, 'userFindById')
        .mockRejectedValue(new Error('Unexpected error'));

      await expect(userTaskService.update(updateDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findById', () => {
    it('should return the task when found', async () => {
      const mockTask = {
        id: 1,
        task: 'Test Task',
        userName: 'Carlos Pujol',
        statusName: 'PENDING',
        createdAt: '2025-02-06 14:29',
        updatedAt: '2025-02-06 14:29',
      };

      jest.spyOn(userTaskRepository, 'findById').mockResolvedValue(mockTask);

      const result = await userTaskService.findById(1);

      expect(result).toEqual(mockTask);
      expect(userTaskRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException when an error occurs', async () => {
      jest
        .spyOn(userTaskRepository, 'findById')
        .mockRejectedValue(
          new InternalServerErrorException('Unexpected error'),
        );

      await expect(userTaskService.findById(1)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, task: 'Task 1' },
        { id: 2, task: 'Task 2' },
      ];

      jest.spyOn(userTaskRepository, 'findAll').mockResolvedValue(mockTasks);

      const result = await userTaskService.findAll();

      expect(result).toEqual(mockTasks);
      expect(userTaskRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no tasks are found', async () => {
      jest.spyOn(userTaskRepository, 'findAll').mockResolvedValue([]);

      const result = await userTaskService.findAll();

      expect(result).toEqual([]);
      expect(userTaskRepository.findAll).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException on unexpected error', async () => {
      jest
        .spyOn(userTaskRepository, 'findAll')
        .mockRejectedValue(
          new InternalServerErrorException('Unexpected error'),
        );

      await expect(userTaskService.findAll()).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteById', () => {
    it('should delete a task successfully', async () => {
      jest
        .spyOn(userTaskRepository, 'deleteById')
        .mockResolvedValue({ affected: 1 });

      const result = await userTaskService.deleteById(1);

      expect(result).toEqual({ affected: 1 });
      expect(userTaskRepository.deleteById).toHaveBeenCalledWith(1);
    });

    it('should throw InternalServerErrorException if deletion fails', async () => {
      jest
        .spyOn(userTaskRepository, 'deleteById')
        .mockRejectedValue(
          new InternalServerErrorException('Unexpected error'),
        );

      await expect(userTaskService.deleteById(1)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
