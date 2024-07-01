import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as Req } from 'express';
import { NewsService as service } from './news.service';
import { createNewsWithTagDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private NewsService: service) {}

  @UseGuards(AuthGuard)
  @Post()
  async createNews(
    @Body() newsDto: createNewsWithTagDto,
    @Request() request: Req,
  ) {
    return await this.NewsService.createNews(newsDto, request);
  }

  @Get()
  async getAllNews() {
    return this.NewsService.getAllNews();
  }
}
