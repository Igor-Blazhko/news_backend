import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { New } from './model/news.model';
import { createNewsDto, createNewsWithTagDto } from './dto/news.dto';
import { createAssociationDto as createAssociationDto } from 'src/news-tags/dto/news-tags.dto';
import { Tag } from 'src/tags/model/tags.model';
import { User } from 'src/users/models/users.model';
import { Request as Req } from 'express';
import { CreateTagDto } from 'src/tags/dto/tags.dto';
import { AuthService as AuthS } from 'src/auth/auth.service';
import { TagsService as TagsS } from 'src/tags/tags.service';
import { NewsTagsService as NewsS } from 'src/news-tags/news-tags.service';
import { Comment } from 'src/comments/model/comments.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(New) private NewORM: typeof New,
    private AuthService: AuthS,
    private TagsService: TagsS,
    private NewsTagsService: NewsS,
  ) {}

  async createNews(
    newsDto: createNewsWithTagDto,
    request: Req,
  ): Promise<string | Error> {
    try {
      const token: string | undefined = this.extractTokenFromHeader(request);
      const payload: Omit<User, 'password'> =
        await this.AuthService.GetUserByToken(token);

      const createNewsDTO: createNewsDto = {
        article: newsDto.article,
        text: newsDto.text,
        Userid: payload.id,
      };
      const NewPost: New = await this.NewORM.create(createNewsDTO);
      const tags: CreateTagDto[] = newsDto.Tags;
      await tags.map(async (tag: CreateTagDto): Promise<void> => {
        const Tag: Tag = await this.TagsService.createTag(tag);
        const createAssociationDTO: createAssociationDto = {
          idPost: NewPost.id,
          idTags: Tag.id,
        };
        await this.NewsTagsService.createAssociation(createAssociationDTO);
      });
      return 'Successful create';
    } catch (error) {
      return error;
    } finally {
    }
  }

  async getOneNews(id: keyof User): Promise<New[]> {
    return await this.NewORM.findAll({
      where: {
        id: id,
      },
      include: [
        { model: Tag, attributes: ['nametag'] },
        {
          model: User,
          attributes: ['id', 'login', 'name'],
        },
        {
          model: Comment,
          attributes: ['text', 'UserId'],
          include: [
            {
              model: User,
              attributes: ['id', 'login', 'name'],
            },
          ],

          order: [['createdAt', 'DESC']],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getAllNews(): Promise<New[]> {
    const Post = this.NewORM.findAll({
      include: [
        { model: Tag, attributes: ['nametag'] },
        {
          model: User,
          attributes: ['id', 'login', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return Post;
  }

  async getAllNewsByUser(UserORM: User): Promise<New[]> {
    return this.NewORM.findAll({
      where: {
        id: UserORM.id,
      },
      include: [
        { model: Tag, attributes: ['nametag'] },
        {
          model: User,
          attributes: ['id', 'login', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  private extractTokenFromHeader(request: Req): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
