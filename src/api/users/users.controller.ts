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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from './dtos/user.dto';
import { PublicationsService } from '../publications/publications.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly publicationsService: PublicationsService,
  ) {}

  @Post()
  private async createUser(@Body() DTO: UserDTO) {
    try {
      const user = await this.usersService.get(DTO.username);
      if (user)
        throw new BadRequestException(`User ${user.username} already exists`);

      DTO.password = await hash(DTO.password, 10);
      const newUser = await this.usersService.create(DTO);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  private async getUsers() {
    try {
      const users = await this.usersService.getAll();
      return users;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  private async getUser(@Param('id') id: string) {
    try {
      const users = await this.usersService.getById(id);
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
    try {
      const user = await this.usersService.update(id, DTO);
      await this.publicationsService.updateUserInfo(id, {
        ...DTO,
        idUser: id,
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  // @Put(':id/avatar')
  // private async uploadAvatar(@Param('id') id: string, @Body() avatar: string) {
  //   try {
  //     const user = await this.usersService.updateAvatar(id, avatar);
  //     return user;
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './upload',
  //       filename: function (req, file, cb) {
  //         cb(null, file.originalname + '_' + Date.now());
  //       },
  //     }),
  //   }),
  // )
  // @Put(':id/avatar')
  // private async uploadAvatar(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   try {
  //     const avatarUrl = file.fieldname;
  //     const avatar = await this.usersService.updateAvatar(id, avatarUrl);
  //     return avatar;
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException(error.message);
  //   }
  // }

  @Delete(':id')
  private async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.usersService.delete(id);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
