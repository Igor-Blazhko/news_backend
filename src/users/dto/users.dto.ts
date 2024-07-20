import { IsNotEmpty, IsString } from 'class-validator';
import { User, createUser } from '../models/users.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements createUser {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user', description: 'Уникальный login пользоватея' })
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'qwerty123', description: 'пароль пользоватея' })
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иван', description: 'имя пользоватея' })
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользоватея' })
  readonly sername: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иван', description: 'имя пользоватея' })
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользоватея' })
  readonly sername: string;
}

export class UpdateUserWithUserDto extends UpdateUserDto {
  @IsNotEmpty()
  readonly User: UserWithoutPass;
}

export class UpdateUserWithImgDto extends UpdateUserDto {
  readonly avatarId: number;
}

export type UserWithoutPass = Omit<User, 'password'>;

export class GoogleUser {
  login: string;
  name: string;
  sername: string;
  picturePath: string;
  accessToken: string;
}
