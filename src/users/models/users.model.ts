import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface createUser {
  name: string;
  sername: string;
  login: string;
  password: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, createUser> {
  @ApiProperty({ example: '1', description: 'Уникальный id пользоватея' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user', description: 'Уникальный login пользоватея' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @ApiProperty({ example: 'qwerty123', description: 'пароль пользоватея' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Иван', description: 'имя пользоватея' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользоватея' })
  @Column({ type: DataType.STRING, allowNull: false })
  sername: string;

  @ApiProperty({ example: '1', description: 'id аватара' })
  @Column({ type: DataType.STRING })
  avatarId: number;
}
