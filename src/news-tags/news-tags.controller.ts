import { Body, Controller, Post } from '@nestjs/common';
import { createAssotiationDto } from './dto/news-tags.dto';
import { NewsTagsService } from './news-tags.service';

@Controller('news-tags')
export class NewsTagsController {
  constructor(private Service: NewsTagsService) {}
  @Post()
  async createAss(@Body() obj: createAssotiationDto) {
    return this.Service.createAssotiation(obj);
  }
}
