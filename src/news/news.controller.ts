import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewsService as service } from './news.service';
import { createNewsWithTagDto } from './dto/news.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddUser } from 'src/auth/adduser.inceptor';
@ApiTags('Работа с новостями')
@Controller('news')
export class NewsController {
  constructor(private NewsService: service) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(AddUser)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createNews(
    @Body() newsDto: createNewsWithTagDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.NewsService.createNews(newsDto, file);
  }

  @Get()
  async getAllNews() {
    return this.NewsService.getAllNews();
  }
}
