import { IsNotEmpty, IsString } from "class-validator";
import { createUser } from '../models/users.model'

export class CreateUserDto implements createUser{
    @IsNotEmpty() 
    @IsString()
    readonly login: string;
    @IsNotEmpty() 
    @IsString()
    readonly password: string;
    @IsNotEmpty() 
    @IsString()
    readonly name: string;
    @IsNotEmpty() 
    @IsString()
    readonly sername: string;
}