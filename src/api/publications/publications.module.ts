import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationSchema } from './publications.model';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Publications', // Collection
            schema: PublicationSchema,
        }]),
    ],
    controllers: [PublicationsController],
    providers: [PublicationsService]
})
export class PublicationsModule { }
