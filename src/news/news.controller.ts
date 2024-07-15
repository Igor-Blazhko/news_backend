import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewsService as service } from './news.service';
import { createNewsWithTagDto } from './dto/news.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddUser } from 'src/auth/adduser.inceptor';
import { New } from './model/news.model';
@ApiTags('Работа с новостями')
@Controller('news')
export class NewsController {
  constructor(private NewsService: service) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(AddUser)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createNews(
    @Body() newsDto: createNewsWithTagDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.NewsService.createNews(newsDto, file);
  }

  @ApiOperation({ summary: 'Get all news or one by ID' })
  @ApiResponse({ status: 200, type: New })
  @Get()
  async getAllNews(@Query('id') id?: number) {
    if (id) return this.NewsService.getOneNews(id);
    else return this.NewsService.getAllNews();
  }
}
