import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TagsService as TagS } from './tags.service';
import { CreateTagDto } from './dto/tags.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Работа с тегами')
@Controller('tags')
export class TagsController {
  constructor(private TagsService: TagS) {}

  @Post()
  async createTag(@Body() tagObj: CreateTagDto) {
    return await this.TagsService.createTag(tagObj);
  }

  @Get()
  async getAllTag() {
    return await this.TagsService.getAllTag();
  }

  @Get('news')
  async getAllNewsByTag(@Query('nametag') nametag: keyof CreateTagDto) {
    return await this.TagsService.getAllNewsByTag(nametag);
  }
}
