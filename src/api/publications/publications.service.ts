import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublicationDTO } from './dto/publication.dto';
import { IPublication } from './interfaces/publication.interface';

@Injectable()
export class PublicationsService {

    constructor(@InjectModel('Publications') private readonly publicationModel: Model<IPublication> ) { }

    public async create( DTO: PublicationDTO ): Promise<IPublication> {
        return await new this.publicationModel(DTO).save();
    }

    public async getAll(): Promise<IPublication[]> {
        return await this.publicationModel.find({}, { password: 0 });
    }

    public async get( id: string ): Promise<IPublication> {
        return await this.publicationModel.findOne({id});
    }

    public async delete( id: string ): Promise<IPublication> {
        return await this.publicationModel.findByIdAndDelete(id);
    }
    
}
