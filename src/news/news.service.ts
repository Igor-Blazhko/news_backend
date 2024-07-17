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
import { Filter } from './Enum';
import { Op } from 'sequelize';

const LIMIT_on_PAGE = 5;
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
      const NewPost: New = await this.NewORM.create(createNewsDTO);
      if (!(NewPost instanceof New)) {
        throw new HttpException(
          'Ошибка записи поста!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      console.log('tags1', newsDto.Tags);
      const tags: CreateTagDto[] = newsDto.Tags.map((item: string) => {
        return { nametag: item };
      });
      console.log('--------------------');
      console.log('tags2', tags);
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

  async getOneNews(id: number): Promise<New> {
    return await this.NewORM.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Tag,
          attributes: ['id', 'nametag'],
          through: { attributes: [] },
        },

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

  async getAllNews(
    page: number,
    filter: string,
    typeFilter: Filter,
  ): Promise<{ posts: New[]; countPage: number }> {
    let limit = undefined;
    let offset = undefined;
    if (page) {
      limit = LIMIT_on_PAGE;
      offset = (page - 1) * LIMIT_on_PAGE;
    }

    let where = undefined;
    let whereTag = undefined;
    let whereUser = undefined;

    let countPage = await this.getCountPage();
    if (filter && typeFilter) {
      switch (typeFilter) {
        case Filter.All:
          const postByTags = await this.getAllNews(
            undefined,
            filter,
            Filter.Tags,
          );
          const postByUser = await this.getAllNews(
            undefined,
            filter,
            Filter.User,
          );
          const postByTitle = await this.getAllNews(
            undefined,
            filter,
            Filter.Title,
          );
          const allPosts = [
            ...postByTags.posts,
            ...postByUser.posts,
            ...postByTitle.posts,
          ];
          const posts = allPosts.slice(offset, offset + limit);
          return {
            posts: posts,
            countPage: Math.ceil(allPosts.length / LIMIT_on_PAGE),
          };
        case Filter.Tags:
          whereTag = {
            nametag: {
              [Op.startsWith]: filter,
            },
          };
          countPage = await this.getCountPage(where, whereTag);
          break;
        case Filter.User:
          whereUser = {
            login: {
              [Op.startsWith]: filter.toLowerCase(),
            },
          };

          countPage = await this.getCountPage(where, whereTag, whereUser);
          break;
        case Filter.Title:
          where = {
            article: {
              [Op.startsWith]: filter,
            },
          };
          countPage = await this.getCountPage(where);
          break;
        default:
          break;
      }
    }

    const Post = await this.NewORM.findAll({
      where,
      include: [
        {
          model: Tag,
          attributes: ['nametag'],
          through: { attributes: [] },
          where: whereTag,
        },
        {
          model: User,
          attributes: ['id', 'login', 'name'],
          where: whereUser,
        },
        { model: Image, attributes: ['path'] },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'article', 'text', 'createdAt'],
    });
    // const countPage = await this.getCountPage(where, whereTag, whereUser);
    return { posts: Post, countPage: countPage };
  }

  async getCountPage(
    whereMain = undefined,
    whereTag = undefined,
    whereUser = undefined,
  ) {
    if (whereMain) {
      const count = +(await this.NewORM.count({
        where: whereMain,
      }));
      return Math.ceil(count / LIMIT_on_PAGE);
    }

    if (whereTag) {
      const count = +(await this.NewORM.count({
        include: [
          {
            model: Tag,
            where: whereTag,
          },
        ],
      }));
      return Math.ceil(count / LIMIT_on_PAGE);
    }
    if (whereUser) {
      const count = +(await this.NewORM.count({
        include: [
          {
            model: User,
            where: whereUser,
          },
        ],
      }));
      return Math.ceil(count / LIMIT_on_PAGE);
    }

    const count = +(await this.NewORM.count());
    return Math.ceil(count / LIMIT_on_PAGE);
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
