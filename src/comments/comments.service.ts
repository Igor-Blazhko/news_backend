import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './model/comments.model';
import { CommentDto } from './dto/comments.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private CommentORM: typeof Comment) {}

  async createComment(CommentDTO: CommentDto): Promise<Error | Comment> {
    try {
      const responseDB = this.CommentORM.create(CommentDTO);
      if (!responseDB) {
        throw new HttpException(
          'Ошибка работы сервера',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return responseDB;
    } catch (error) {
      return error;
    }
  }
}
