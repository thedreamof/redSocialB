import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';
import { compare, hash } from 'bcryptjs';
import { UsersService } from 'src/api/users/users.service';
import { UserDTO } from 'src/api/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    @Post('/signup')
    private async createUser(@Body() DTO: UserDTO) {
        console.log(DTO);
        try {
            const user = await this.usersService.get(DTO.username);
            if (user) throw new BadRequestException(`User ${user.username} already exists`);

            DTO.password = await hash(DTO.password, 10);
            const newUser = await this.usersService.create(DTO);
            return { status: 'success', data: newUser };

        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message);
        }
    }

    @Post('/login')
    private async login(@Body() DTO: AuthDTO): Promise<{ token: string, payload: object }> {
        try {
            const user = await this.authService.login(DTO.username);
            if (!user) {
                throw new BadRequestException(`*User or Password not is correct`);
            }

            const password = await compare(DTO.password, user.password);
            if (!password) {
                throw new BadRequestException(`User or Password not is correct`);
            }

            const payload = {
                idUser: user.id,
                username: user.username,
                name: user.name,
                lastname: user.lastname,
                avatar: user.avatar,
            };

            const token = this.jwtService.sign(payload);
            return { token, payload };

        } catch (error) {
            console.error(error);
            throw new BadRequestException(`User or Password not is correct`);
        }
    }
    
}
