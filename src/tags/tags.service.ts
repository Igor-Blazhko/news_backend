import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tag } from './model/tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/tags.dto';
import { New } from 'src/news/model/news.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private TagORM: typeof Tag) {}

  async createTag(tag: CreateTagDto): Promise<Tag> {
    try {
      const candidate = await this.TagORM.findOne({
        where: {
          nametag: tag.nametag,
        },
      });
      if (candidate) {
        return candidate;
      }
      return await this.TagORM.create(tag);
    } catch (error) {
      return error;
    }
  }

  async getAllTag() {
    return this.TagORM.findAll();
  }

  async getAllNewsByTag(tag: keyof CreateTagDto) {
    try {
      const responseTag = await this.TagORM.findAll({
        where: {
          nametag: tag,
        },
        include: New,
      });
      if (!responseTag) {
        throw new HttpException(
          'Ошибка работы с базой данных',
          HttpStatus.BAD_REQUEST,
        );
      }

      return responseTag;
    } catch (error) {}
  }
}
