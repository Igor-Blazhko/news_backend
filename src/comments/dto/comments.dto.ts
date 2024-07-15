import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NewComment } from '../model/comments.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserWithoutPass } from 'src/users/dto/users.dto';
import { Transform } from 'class-transformer';

export class CommentDto implements NewComment {
  @ApiProperty({ example: 'some text', description: 'Text comments' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: '1', description: 'Id post' })
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  PostId: number;

  @ApiProperty({ example: '1', description: 'Author' })
  UserId: number;

  User?: UserWithoutPass;
}
