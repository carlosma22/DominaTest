import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserTaskService } from '../services/userTask.service';
import { CreateBodyDto } from '../dto/createBody.dto';
import { UpdateBodyDto } from '../dto/updateBody.dto';
import { FindDto } from '../dto/find.dto';
import { DeleteDto } from '../dto/delete.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('userTask') // Tag para agrupar endpoints de tareas de usuario
@UseGuards(AuthGuard('jwt'))
@Controller('userTask')
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Post('create')
  @ApiOperation({ summary: 'Crear una nueva tarea de usuario' })
  @ApiBody({ type: CreateBodyDto })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public async create(@Body() body: CreateBodyDto): Promise<object> {
    try {
      const response = await this.userTaskService.create(body);
      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put('update')
  @ApiOperation({ summary: 'Actualizar una tarea de usuario' })
  @ApiBody({ type: UpdateBodyDto })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public async update(@Body() body: UpdateBodyDto): Promise<object> {
    try {
      const response = await this.userTaskService.update(body);
      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('find')
  @ApiOperation({ summary: 'Buscar una tarea de usuario por ID' })
  @ApiQuery({
    name: 'taskId',
    description: 'ID de la tarea a buscar',
    type: FindDto,
  }) // Documenta el query parameter
  @ApiResponse({ status: 200, description: 'Tarea encontrada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' }) // Ejemplo de 404
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public async find(@Query() query: FindDto): Promise<object> {
    try {
      const response = await this.userTaskService.findById(query.taskId);
      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get('findAll')
  @ApiOperation({ summary: 'Obtener todas las tareas de usuario' })
  @ApiResponse({ status: 200, description: 'Lista de tareas' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public async findAll(): Promise<object> {
    try {
      const response = await this.userTaskService.findAll();
      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Eliminar una tarea de usuario por ID' })
  @ApiQuery({
    name: 'taskId',
    description: 'ID de la tarea a eliminar',
    type: DeleteDto,
  }) // Documenta el query parameter
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  public async delete(@Query() query: DeleteDto): Promise<object> {
    try {
      const response = await this.userTaskService.deleteById(query.taskId);
      return { success: true, message: response };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
