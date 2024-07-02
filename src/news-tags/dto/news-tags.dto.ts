import { IsNotEmpty, IsString } from 'class-validator';
import { TagsPostsCreation } from '../news-tags.model';
import { ApiProperty } from '@nestjs/swagger';

export class createAssociationDto implements TagsPostsCreation {
  @ApiProperty({ example: '1', description: 'Id поста' })
  @IsString()
  @IsNotEmpty()
  readonly idPost: number;

  @ApiProperty({ example: '1', description: 'Id тэга' })
  @IsString()
  @IsNotEmpty()
  readonly idTags: number;
}
