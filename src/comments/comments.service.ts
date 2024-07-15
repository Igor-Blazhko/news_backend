import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './model/comments.model';
import { CommentDto } from './dto/comments.dto';
import { User } from 'src/users/models/users.model';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private CommentORM: typeof Comment) {}

  async createComment(CommentDTO: CommentDto): Promise<Error | Comment> {
    try {
      CommentDTO = {
        ...CommentDTO,
        UserId: CommentDTO.User.id,
      };
      delete CommentDTO.User;
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

  async getCommentByPost(id: number) {
    return this.CommentORM.findAll({
      where: {
        PostId: id,
      },
    });
  }
}
