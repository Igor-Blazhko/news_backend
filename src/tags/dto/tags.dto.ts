import { IsNotEmpty, IsString } from "class-validator";
import { CreateTags } from "../model/tags.model";

export class CreateTagDto implements CreateTags{
    @IsString()
    @IsNotEmpty()
    readonly nametag:string;
}