import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { New } from './model/news.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { TagsModule } from 'src/tags/tags.module';
import { NewsTagsModule } from 'src/news-tags/news-tags.module';
import { UploadfileModule } from 'src/uploadfile/uploadfile.module';

@Module({
  imports: [
    SequelizeModule.forFeature([New]),
    JwtModule,
    AuthModule,
    TagsModule,
    NewsTagsModule,
    UploadfileModule,
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
