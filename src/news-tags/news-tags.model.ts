import { ApiOperation } from "@nestjs/swagger";
import { table } from "console";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { New } from "src/news/model/news,.model";
import { Tag } from "src/tags/model/tags.model";
import { User } from "src/users/models/users.model";

interface TagsPostsCreation {
    idPosts:number,
    idTags:number, 
}

@Table({tableName:'News-Tags'})
export class NewsTags extends Model<NewsTags, TagsPostsCreation>{

    @ForeignKey(()=>New)
    @Column({type:DataType.INTEGER, allowNull:false})
    NewsId: number;

    @ForeignKey(()=>Tag)
    @Column({type:DataType.INTEGER, allowNull:false})
    TagId: number;


}