import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user', description: 'Уникальный login пользоватея' })
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'qwerty123', description: 'пароль пользоватея' })
  readonly password: string;
}

export class ObjectToken {
  @ApiProperty({
    example: 'eyJhbGc...kpXVCJ9.eyJ...z0.MK7Z-q67usKmC4tU7l...H0UACB2MQv3I',
    description: 'Хэш access Токен',
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGcasdas2H0UACB2MQv3I',
    description: 'Хэш refresh Токен',
  })
  refresh_token: string;
}
