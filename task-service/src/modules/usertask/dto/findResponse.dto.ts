import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { format } from 'date-fns';

export class FindResponseDTO {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsString()
  task: string;

  @IsString()
  userName: string;

  @IsString()
  statusName: string;

  @IsString()
  @Transform(({ value }) => {
    return format(value, 'yyyy-MM-dd HH:mm');
  })
  createdAt: string;

  @IsString()
  @Transform(({ value }) => {
    return format(value, 'yyyy-MM-dd HH:mm');
  })
  updatedAt: string;
}
