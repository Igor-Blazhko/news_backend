import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
    constructor(private TagsService:TagsService){}

    @Post()
    async createTag(@Body() tagObj:CreateTagDto){
        return await this.TagsService.createTag(tagObj)
    }

    @Get()
    async getAllTag(){
        return await this.TagsService.getAllTag()
    }
}
