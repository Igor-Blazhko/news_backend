import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { User } from "./users/models/users.model";
import { AppController } from "./app.controller";
import { AuthModule } from './auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { NewsTagsModule } from './news-tags/news-tags.module';
import { New } from "./news/model/news,.model";
import { Tag } from "./tags/model/tags.model";
import { NewsTags } from "./news-tags/news-tags.model";

@Module({
    controllers: [AppController],
    imports: [
        JwtModule,
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
                models: [User,New,Tag,NewsTags],
            }),
            inject:[ConfigService], 
        }),
        NewsModule,
        CommentsModule,
        UsersModule,
        TagsModule,
        AuthModule,
        NewsTagsModule,
      ],
})
export class AppModule{
}