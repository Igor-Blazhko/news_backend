import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { New } from './model/news.model';
import { createNewsDto, createNewsWithTagDto } from './dto/news.dto';
import { createAssotiationDto } from 'src/news-tags/dto/news-tags.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { NewsTags } from 'src/news-tags/news-tags.model';
import { Tag } from 'src/tags/model/tags.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(New) private NewORM: typeof New) {}

  async createNews(newsDTO: createNewsDto): Promise<New> {
    return await this.NewORM.create(newsDTO);
  }

  async getOneNews(id) {
    return await this.NewORM.findAll({
      where: {
        id: id,
      },
      include: Tag,
    });
  }

  async getAllNews(){
    return this.NewORM.findAll({ include: Tag });
  }
}
