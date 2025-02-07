import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginBodyDto } from '../dto/loginBody.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth') // Tag para agrupar endpoints de autenticación
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' }) // Descripción del endpoint
  @ApiBody({ type: LoginBodyDto }) // DTO para el body
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' }) // Respuesta exitosa
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' }) // Ejemplo de respuesta 401
  @ApiResponse({ status: 500, description: 'Error interno del servidor' }) // Respuesta de error
  async login(@Body() body: LoginBodyDto): Promise<object> {
    try {
      const response = await this.authService
        .validateUser(body.email, body.password)
        .then((user) => this.authService.login(user));

      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
