import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationsController } from '../publications/publications.controller';
import { PublicationSchema } from '../publications/publications.model';
import { PublicationsService } from '../publications/publications.service';
import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users', // Collection
        schema: UserSchema,
      },
      {
        name: 'Publications', // Collection
        schema: PublicationSchema,
      },
    ]),
  ],
  controllers: [UsersController, PublicationsController],
  providers: [UsersService, PublicationsService],
})
export class UsersModule {}
