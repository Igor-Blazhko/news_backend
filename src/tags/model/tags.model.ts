import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { NewsTags } from 'src/news-tags/news-tags.model';
import { New } from 'src/news/model/news.model';

export interface CreateTags {
  nametag: string;
}

@Table({ tableName: 'Tags' })
export class Tag extends Model<Tag, CreateTags> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  nametag: string;

  @BelongsToMany(() => New, () => NewsTags)
  news: New[];
}
