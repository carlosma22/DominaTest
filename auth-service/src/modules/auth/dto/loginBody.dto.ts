import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty({ description: 'Correo electrónico del usuario' }) // Descripción del campo
  @IsEmail({}, { message: 'The email is not valid' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' }) // Descripción del campo
  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}
