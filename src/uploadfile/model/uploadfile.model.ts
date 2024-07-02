import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

export interface CreatePath {
  readonly path: string;
  readonly UserId: number;
}

@Table({ tableName: 'Images' })
export class Image extends Model<Image, CreatePath> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  path: string;
}
