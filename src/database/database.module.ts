import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGODB_URI } from '../config/constants';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            // connectionName: 'DBsocial',
            useFactory: ( configService: ConfigService ) => ({
                uri: configService.get<string>(MONGODB_URI),
                useFindAndModify: false,
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule {}
