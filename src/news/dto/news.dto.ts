import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNews } from '../model/news.model';
import { CreateTagDto } from 'src/tags/dto/tags.dto';
import { User } from 'src/users/models/users.model';

interface CreateNewsWithTags extends CreateNews {
  readonly Tags: CreateTagDto[];
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '[{id(Tags):1, nametag:"Byaka"}]',
    description: ' Массив объектов Тэга',
  })
  Tags: CreateTagDto[];

  @IsNotEmpty()
  @IsString()
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
