import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { New } from 'src/news/model/news.model';
import { UserWithoutPass } from 'src/users/dto/users.dto';
import { User } from 'src/users/models/users.model';

export interface NewComment {
  readonly text: string;
  readonly PostId: number;
  readonly UserId: number;
  readonly User?: UserWithoutPass;
}

@Table({ tableName: 'Comments' })
export class Comment extends Model<Comment, NewComment> {
  @ApiProperty({ example: '1', description: 'Уникальный id комментария' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Какой-то текст', description: 'Текст комментария' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный id пользователя, создавшего комментарий',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserId: number;

  @ApiProperty({ example: '1', description: 'Id поста' })
  @ForeignKey(() => New)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  PostId: number;

  @BelongsTo(() => User, 'id')
  author: User;
}
