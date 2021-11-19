import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IUser } from './interfaces/users.interface';
import { UserDTO, UserUpdateDTO } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<IUser>,
  ) {}

  public async create(DTO: UserDTO): Promise<IUser> {
    return await new this.usersModel(DTO).save();
  }

  public async getAll(): Promise<IUser[]> {
    return await this.usersModel.find({}, { password: 0 });
  }

  public async get(username: string): Promise<IUser> {
    return await this.usersModel.findOne({ username }, { password: 0 });
  }

  public async getById(id: string): Promise<IUser> {
    return await this.usersModel.findById(id, { password: 0 });
  }

  public async update(id: string, DTO: UserUpdateDTO): Promise<IUser> {
    return await this.usersModel.findByIdAndUpdate(id, DTO);
  }

  public async updateAvatar(id: string, avatar: string): Promise<IUser> {
    return await this.usersModel.findByIdAndUpdate(id, { avatar: avatar });
  }

  public async delete(id: string): Promise<IUser> {
    return await this.usersModel.findByIdAndDelete(id);
  }

  // public async addPublication( idUser: string, DTO: PublicationDTO ): Promise<IUser> {
  //     return await this.usersModel.findOneAndUpdate(
  //         { _id: idUser },
  //         { $addToSet: { 'publication': DTO } },
  //         { new: true }
  //     );
  // }
}
