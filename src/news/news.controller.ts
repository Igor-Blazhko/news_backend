import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as Req } from 'express';
import { NewsService as service } from './news.service';
import { createNewsWithTagDto } from './dto/news.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Работа с новостями')
@Controller('news')
export class NewsController {
  constructor(private NewsService: service) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createNews(
    @Body() newsDto: createNewsWithTagDto,
    @Request() request: Req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.NewsService.createNews(newsDto, request, file);
  }

  @Get()
  async getAllNews() {
    return this.NewsService.getAllNews();
  }
}
