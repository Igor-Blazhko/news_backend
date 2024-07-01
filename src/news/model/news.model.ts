import { ApiOperation } from '@nestjs/swagger';
import { table } from 'console';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NewsTags } from 'src/news-tags/news-tags.model';
import { Tag } from 'src/tags/model/tags.model';
import { User } from 'src/users/models/users.model';

export interface CreateNews {
  article: string;
  text: string;
  UserId?: number;
}

@Table({ tableName: 'News' })
export class New extends Model<New, CreateNews> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  article: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  text: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  Userid: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Tag, () => NewsTags)
  tags: Tag[];
}
