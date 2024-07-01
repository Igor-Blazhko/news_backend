import { Module } from '@nestjs/common';
import { NewsTagsService } from './news-tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsTags } from './news-tags.model';
import { NewsTagsController } from './news-tags.controller';

@Module({
  imports: [SequelizeModule.forFeature([NewsTags])],
  providers: [NewsTagsService],
  exports: [NewsTagsService],
  controllers: [NewsTagsController],
})
export class NewsTagsModule {}
