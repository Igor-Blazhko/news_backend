import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { User } from "./users/models/users.model";
import { AppController } from "./app.controller";

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot({
            isGlobal:true,
        }),
        SequelizeModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: (configService: ConfigService) => ({
                dialect: configService.get('POSTGRES_DIALECT'),
                host: configService.get('POSTGRES_HOST'),
                port: Number(configService.get('POSTGRES_PORT')),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB_NAME'),
                models: [User],
            }),
            inject:[ConfigService], 
        }),
        NewsModule,
        CommentsModule,
        UsersModule,
        TagsModule,
      ],
})
export class AppModule{
}