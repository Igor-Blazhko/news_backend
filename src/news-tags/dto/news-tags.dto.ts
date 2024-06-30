import { IsNotEmpty, IsString } from "class-validator";
import { TagsPostsCreation } from "../news-tags.model";

export class createAssotiationDto implements TagsPostsCreation{
    @IsString()
    @IsNotEmpty()
    readonly idPosts:number;

    @IsString()
    @IsNotEmpty()
    readonly idTags:number;
}