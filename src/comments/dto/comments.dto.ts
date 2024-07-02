import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NewComment } from '../model/comments.model';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto implements NewComment {
  @ApiProperty({ example: 'some text', description: 'Text comments' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: '1', description: 'Id post' })
  @IsNotEmpty()
  @IsNumber()
  PostId: number;

  @ApiProperty({ example: '1', description: 'Id author' })
  @IsNotEmpty()
  @IsNumber()
  UserId: number;
}
