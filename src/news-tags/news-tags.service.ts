import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewsTags } from './news-tags.model';
import { createAssociationDto as createAssociationDto } from './dto/news-tags.dto';

@Injectable()
export class NewsTagsService {
  constructor(@InjectModel(NewsTags) private NewsTagsORM: typeof NewsTags) {}

  async createAssociation(
    association: createAssociationDto,
  ): Promise<NewsTags> {
    return await this.NewsTagsORM.create(association);
  }
}
