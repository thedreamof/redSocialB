import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddCommentDTO,
  AddLikeDTO,
  PublicationDTO,
} from './dto/publication.dto';
import { IPublication } from './interfaces/publication.interface';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel('Publications')
    private readonly publicationModel: Model<IPublication>,
  ) {}

  public async create(DTO: PublicationDTO): Promise<IPublication> {
    return await new this.publicationModel(DTO).save();
  }

  public async getAll(): Promise<IPublication[]> {
    return await this.publicationModel.find();
  }

  public async get(id: string): Promise<IPublication> {
    return await this.publicationModel.findOne({ id });
  }

  public async getPublicationsUser(idUser: string): Promise<IPublication[]> {
    return await this.publicationModel.find({ 'userCreated.idUser': idUser });
  }

  public async updateUserInfo(idUser: string, user: unknown): Promise<any> {
    console.log('User id', idUser.toString());
    console.log('User updateInfo', user);
    return await this.publicationModel.updateMany(
      { 'userCreated.idUser': idUser.toString() },
      { $set: { userCreated: user } },
      { new: false },
    );
  }

  public async addLike(id: string, DTO: AddLikeDTO): Promise<IPublication> {
    return await this.publicationModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { likes: DTO } },
      { new: true },
    );
  }

  public async addComment(
    id: string,
    DTO: AddCommentDTO,
  ): Promise<IPublication> {
    return await this.publicationModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { comments: DTO } },
      { new: true },
    );
  }

  public async deleteLike(id: string, DTO: AddLikeDTO): Promise<IPublication> {
    console.log(id);
    console.log(DTO);
    return await this.publicationModel.findOneAndUpdate(
      { _id: id },
      { $pull: { likes: { id: DTO.id } } },
      { new: true },
    );
  }
  public async delete(id: string): Promise<IPublication> {
    return await this.publicationModel.findByIdAndDelete(id);
  }
}
