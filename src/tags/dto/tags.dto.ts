import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTags } from '../model/tags.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto implements CreateTags {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'buka1', description: 'Имя тэга' })
  readonly nametag: string;
}
