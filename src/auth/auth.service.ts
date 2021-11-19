import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/api/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUser>,
  ) {}

  public async login(username: string): Promise<IUser> {
    return await this.usersModel.findOne({ username });
  }
}
