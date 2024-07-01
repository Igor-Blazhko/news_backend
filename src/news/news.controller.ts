import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { createNewsDto, createNewsWithTagDto } from './dto/news.dto';
import { Request as Req } from 'express';
import { User } from 'src/users/models/users.model';
import { NewsService } from './news.service';
import { AuthService } from 'src/auth/auth.service';
import { TagsService } from 'src/tags/tags.service';
import { NewsTagsService } from 'src/news-tags/news-tags.service';
import { Tag } from 'src/tags/model/tags.model';
import { CreateTagDto } from 'src/tags/dto/tags.dto';
import { New } from './model/news.model';
import { createAssotiationDto } from 'src/news-tags/dto/news-tags.dto';
import { NewsTags } from 'src/news-tags/news-tags.model';

@Controller('news')
export class NewsController {
  constructor(
    private NewsService: NewsService,
    private AuthService: AuthService,
    private TagsService: TagsService,
    private NewsTagsService: NewsTagsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createNews(
    @Body() newsDto: createNewsWithTagDto,
    @Request() request: Req,
  ) {
    const token: string | undefined = this.extractTokenFromHeader(request);
    const payload: Omit<User, 'password'> =
      await this.AuthService.GetUserByToken(token); // get obj user {id, login, name, sername}

    const createNewsDTO: createNewsDto = {
      article: newsDto.article,
      text: newsDto.text,
      Userid: payload.id,
    };
    const NewPost: New = await this.NewsService.createNews(createNewsDTO);
    const tags: CreateTagDto[] = newsDto.Tags;

    await tags.map(async (tag: CreateTagDto): Promise<void> => {
      const Tag: Tag = await this.TagsService.createTag(tag);
      const createAssotiationDTO: createAssotiationDto = {
        idPost: NewPost.id,
        idTags: Tag.id,
      };
      await this.NewsTagsService.createAssotiation(createAssotiationDTO);
    });

    return await this.NewsService.getOneNews(NewPost.id);
  }


  @Get()
  async getAllNews(){
    return this.NewsService.getAllNews()
  }
  private extractTokenFromHeader(request: Req): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
