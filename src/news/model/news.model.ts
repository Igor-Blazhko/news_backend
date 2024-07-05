import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/model/comments.model';
import { NewsTags } from 'src/news-tags/news-tags.model';
import { Tag } from 'src/tags/model/tags.model';
import { Image } from 'src/uploadfile/model/uploadfile.model';
import { User } from 'src/users/models/users.model';

export interface CreateNews {
  article: string;
  text: string;
  UserId?: number;
  ImageId?: number;
}

@Table({ tableName: 'News' })
export class New extends Model<New, CreateNews> {
  @ApiProperty({ example: '1', description: 'Уникальный id новости' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Заголовок', description: 'Заголовок статьи' })
  @Column({ type: DataType.STRING, allowNull: false })
  article: string;

  @ApiProperty({ example: 'Текст', description: 'Текст статьи' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: '1', description: 'id создателя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  UserId: number;

  @ApiProperty({ example: '1', description: 'id картинки' })
  @ForeignKey(() => Image)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ImageId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Tag, () => NewsTags)
  tags: Tag[];

  @HasMany(() => Comment, {
    foreignKey: 'PostId',
  })
  comments: Comment[];

  @HasOne(() => Image, 'id')
  image: Image;
}
