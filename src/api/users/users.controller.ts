import { hash } from 'bcryptjs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './dtos/user.dto';
import { PublicationDTO } from '../publications/dto/publication.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  private async createUser(@Body() DTO: UserDTO) {
    console.log(DTO);
    try {
      const user = await this.usersService.get(DTO.username);
      if (user)
        throw new BadRequestException(`User ${user.username} already exists`);

      DTO.password = await hash(DTO.password, 10);
      const newUser = await this.usersService.create(DTO);
      return { status: 'success', data: newUser };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  private async getUsers() {
    try {
      const users = await this.usersService.getAll();
      return { status: 'success', data: users };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':username')
  private async getUser(@Param('username') username: string) {
    try {
      const users = await this.usersService.get(username);
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  private async updateUser(
    @Param('id') id: string,
    @Body() DTO: UserUpdateDTO,
  ) {
    console.log(DTO);
    try {
      const user = await this.usersService.update(id, DTO);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  private async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete(id);
      return { status: 'success', data: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
