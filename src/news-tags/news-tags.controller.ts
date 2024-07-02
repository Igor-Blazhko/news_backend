import { Body, Controller, Post } from '@nestjs/common';
import { createAssociationDto } from './dto/news-tags.dto';
import { NewsTagsService } from './news-tags.service';

@Controller('news-tags')
export class NewsTagsController {
  constructor(private Service: NewsTagsService) {}
  @Post()
  async createAss(@Body() obj: createAssociationDto) {
    return this.Service.createAssociation(obj);
  }
}
