import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNews } from '../model/news.model';
import { User } from 'src/users/models/users.model';

interface CreateNewsWithTags extends CreateNews {
  readonly Tags: string[];
}

export class createNewsWithTagDto implements CreateNewsWithTags {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Заголовок', description: 'Заголовок статьи' })
  readonly article: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Какой-то текст статьи',
    description: 'Текст статьи',
  })
  readonly text: string;

  @ApiProperty({
    example: '[{id(Tags):1, nametag:"Byaka"}]',
    description: ' Массив объектов Тэга',
  })
  Tags: string[];

  @IsNotEmpty()
  User?: User;
}

export class createNewsDto implements CreateNews {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Заголовок', description: 'Заголовок статьи' })
  readonly article: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Какой-то текст статьи',
    description: 'Текст статьи',
  })
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'Id user',
  })
  readonly UserId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '1',
    description: 'Id user',
  })
  readonly ImageId: number;
}
