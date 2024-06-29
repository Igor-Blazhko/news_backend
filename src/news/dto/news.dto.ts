import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, isEmpty, isString } from "class-validator"
import { CreateNews } from "../model/news,.model";

export class createNewsDto implements CreateNews {
    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Заголовок', description: 'Заголовок статьи' } )
    readonly article: string;
    @IsNotEmpty() 
    @IsString()
    @ApiProperty( { example: 'Какой-то текст статьи', description: 'Текст статьи' } )
    readonly text: string;
}
