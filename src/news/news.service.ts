import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { New } from './model/news,.model';
import { createNewsDto, createNewsWithTagDto } from './dto/news.dto';
import { createAssotiationDto } from 'src/news-tags/dto/news-tags.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NewsService {

    constructor(@InjectModel(New) private NewORM:typeof New){}

    async createNews(newsDTO:createNewsWithTagDto, token:string):Promise<New>{

        
        //const payload =  new JwtService().verify(token);//jwt в теории хранит токены

        // const news:createNewsDto = Object.assign({}, newsDTO);
        // const TagsId:number|number[] = newsDTO.TagsId;
        // delete newsDTO.TagsId;
        console.log(token)
        // const assotiationDto:createAssotiationDto ={
        //     idPosts:
        //     id
        // }
        return
    }
}
