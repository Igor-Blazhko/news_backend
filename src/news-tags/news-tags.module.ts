import { Module } from '@nestjs/common';
import { NewsTagsService } from './news-tags.service';

@Module({
  providers: [NewsTagsService]
})
export class NewsTagsModule {}
