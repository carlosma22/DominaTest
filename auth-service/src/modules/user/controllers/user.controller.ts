import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserBodyDto } from '../dto/userBody.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('user') // Agrega un tag para agrupar los endpoints relacionados con usuarios
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción del endpoint
  @ApiBody({ type: UserBodyDto }) // Especifica el DTO para el body
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' }) // Respuesta exitosa
  @ApiResponse({ status: 500, description: 'Error interno del servidor' }) // Respuesta de error
  public async create(@Body() body: UserBodyDto): Promise<any> {
    try {
      const response = await this.userService.create(body);

      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
