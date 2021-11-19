import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';
import { compare, hash } from 'bcryptjs';
import { UsersService } from 'src/api/users/users.service';
import { UserDTO } from 'src/api/users/dtos/user.dto';
import { IUserBasic } from 'src/api/users/interfaces/users.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  private async createUser(@Body() DTO: UserDTO) {
    try {
      const user = await this.authService.login(DTO.username);
      if (user)
        throw new BadRequestException(`User ${user.username} already exists`);

      DTO.password = await hash(DTO.password, 10);
      DTO.avatar = 'none';
      const newUser = await this.usersService.create(DTO);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  @Post('/login')
  private async login(
    @Body() DTO: AuthDTO,
  ): Promise<{ token: string; payload: IUserBasic }> {
    try {
      const user = await this.authService.login(DTO.username);
      if (!user) {
        throw new BadRequestException(`*User or Password not is correct`);
      }

      const password = await compare(DTO.password, user.password);
      if (!password) {
        throw new BadRequestException(`User or Password not is correct`);
      }

      const payload: IUserBasic = {
        idUser: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        // avatar: user.avatar,
      };

      const token = this.jwtService.sign(payload);
      payload.avatar = user.avatar;
      return { token, payload };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`User or Password is not correct`);
    }
  }
}
