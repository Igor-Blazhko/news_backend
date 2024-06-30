import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, isEmpty, isString } from "class-validator"
import { CreateNews } from "../model/news,.model";

interface CreateNewsWithTags extends CreateNews{
    readonly TagsId: number|number[];
}

export class createNewsWithTagDto implements CreateNewsWithTags {
    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Заголовок', description: 'Заголовок статьи' } )
    readonly article: string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Какой-то текст статьи', description: 'Текст статьи' } )
    readonly text: string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: '1', description: 'Id пользователя' } )
    readonly UserId: number;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: '1', description: 'Id тэга' } )
    TagsId: number|number[];
}

export class createNewsDto implements CreateNews {
    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Заголовок', description: 'Заголовок статьи' } )
    readonly article: string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Какой-то текст статьи', description: 'Текст статьи' } )
    readonly text: string;

    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: '1', description: 'Id пользователя' } )
    readonly UserId: number;
}