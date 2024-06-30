import { Module } from '@nestjs/common';
import { NewsTagsService } from './news-tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsTags } from './news-tags.model';

@Module({
  imports:[
    SequelizeModule.forFeature([NewsTags]),
  ],
  providers: [NewsTagsService]
})
export class NewsTagsModule {}
