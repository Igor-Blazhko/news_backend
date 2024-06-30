import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Tag } from './model/tags.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/tags.dto';

@Injectable()
export class TagsService {

    constructor(@InjectModel(Tag) private TagORM:typeof Tag){

    }

    async createTag(tag:CreateTagDto):Promise<Tag>{
        try{
            const candidate = await this.TagORM.findOne({
                where:{
                    nametag:tag.nametag
                }
            })
            if (candidate){
                return candidate
            }
            return this.TagORM.create(tag)
        }catch(error){
            return error
        }
        
    }

    async getAllTag(){
        return this.TagORM.findAll()
    }
}
