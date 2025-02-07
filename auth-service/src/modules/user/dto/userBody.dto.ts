import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserBodyDto {
  @ApiProperty({ description: 'Documento del usuario' }) // Descripción del campo
  @IsString()
  @IsNotEmpty({ message: 'The document is required' })
  document: string;

  @ApiProperty({ description: 'Primer nombre del usuario' }) // Descripción del campo
  @IsString()
  @IsNotEmpty({ message: 'The first name is required' })
  firstName: string;

  @ApiProperty({ description: 'Apellido del usuario' }) // Descripción del campo
  @IsString()
  @IsNotEmpty({ message: 'The last name is required' })
  lastName: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' }) // Descripción del campo
  @IsEmail({}, { message: 'The email is not valid' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario' }) // Descripción del campo
  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  @MinLength(6, {
    message: 'The password must be more than 6 characters or more',
  })
  password: string;
}
