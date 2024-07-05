import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { UploadfileService } from 'src/uploadfile/uploadfile.service';
import { Image } from 'src/uploadfile/model/uploadfile.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(New) private NewORM: typeof New,
    private AuthService: AuthS,
    private TagsService: TagsS,
    private NewsTagsService: NewsS,
    private UploadService: UploadfileService,
  ) {}

  async createNews(
    newsDto: createNewsWithTagDto,
    file: Express.Multer.File,
  ): Promise<string | Error> {
    console.log(newsDto);
    try {
      const Newfile: Image | Error =
        await this.UploadService.saveFilePath(file);
      if (!(Newfile instanceof Image)) {
        throw new HttpException(
          'Error upload file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const createNewsDTO: createNewsDto = {
        article: newsDto.article,
        text: newsDto.text,
        UserId: newsDto.User.id,
        ImageId: Number(Newfile.id),
      };
      console.log(createNewsDTO);
      const NewPost: New = await this.NewORM.create(createNewsDTO);
      if (!(NewPost instanceof New)) {
        throw new HttpException(
          'Ошибка записи поста!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      console.log('newpost', NewPost);
      const tags: CreateTagDto[] = newsDto.Tags;
      await tags.map(async (tag: CreateTagDto): Promise<void> => {
        const Tag: Tag = await this.TagsService.createTag(tag);
        const createAssociationDTO: createAssociationDto = {
          idPost: NewPost.id,
          idTags: Tag.id,
        };
        await this.NewsTagsService.createAssociation(createAssociationDTO);
      });
      return new HttpException('Successful', HttpStatus.CREATED);
    } catch (error) {
      return error;
    } finally {
    }
  }

  async getOneNews(id: keyof New): Promise<New[]> {
    return await this.NewORM.findAll({
      where: {
        id: id,
      },
      include: [
        { model: Tag, attributes: ['nametag'], through: { attributes: [] } },

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
        {
          model: Image,
          attributes: ['path'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getAllNews(): Promise<New[]> {
    const Post = this.NewORM.findAll({
      include: [
        { model: Tag, attributes: ['nametag'], through: { attributes: [] } },
        {
          model: User,
          attributes: ['id', 'login', 'name'],
        },
        { model: Image, attributes: ['path'] },
      ],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'article', 'text'],
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
