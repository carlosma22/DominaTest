import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindDto {
  @ApiProperty({ description: 'ID de la tarea a buscar' })
  @IsNotEmpty({ message: 'The taskId is required' })
  @IsNumber({}, { message: 'taskId must be a number' })
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  taskId: number;
}
