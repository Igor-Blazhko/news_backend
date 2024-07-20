import { Controller } from '@nestjs/common';
import { NewsTagsService } from './news-tags.service';

@Controller('news-tags')
export class NewsTagsController {
  constructor(private Service: NewsTagsService) {}
}
