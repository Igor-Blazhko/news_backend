import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { createNewsWithTagDto } from './dto/news.dto';
import { Request as Req} from 'express';

@Controller('news')
export class NewsController {

    constructor( private NewsService:NewsService){}

    @UseGuards(AuthGuard)
    @Post()
    async createNews(@Body() newsDto:createNewsWithTagDto, @Request() request: Req){
        const token = this.extractTokenFromHeader(request)
        return this.NewsService.createNews(newsDto, token)
    }

    private extractTokenFromHeader(request: Req): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}
