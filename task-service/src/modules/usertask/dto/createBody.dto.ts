import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBodyDto {
  @ApiProperty({ description: 'Descripción de la tarea' })
  @IsString()
  @IsNotEmpty({ message: 'The task is required' })
  task: string;

  @ApiProperty({ description: 'Descripción detallada de la tarea (opcional)' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'ID del usuario asignado a la tarea' })
  @IsNumber()
  @IsNotEmpty({ message: 'The userId is required' })
  userId: number;

  @ApiProperty({ description: 'ID del estado de la tarea' })
  @IsNumber()
  @IsNotEmpty({ message: 'The statusId is required' })
  statusId: number;
}
