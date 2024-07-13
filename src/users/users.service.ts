import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private UserORM:typeof User){}

    async CreateUser(userBodyRegister:CreateUserDto):Promise<Error|User>{
        try{
            let userBodyRegisterModifed:CreateUserDto = {
                ...userBodyRegister,
                login:userBodyRegister.login.toLowerCase(),
            }

            const user = await this.UserORM.create(userBodyRegisterModifed)
            if (!(user instanceof User)){
                throw new HttpException('Ошибка работы с базой данных во время добавления', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return user
        }catch(error){
            return error
        }
    }

    async getUserAtLogin(login:string):Promise<Error|User>{
        try{
            const user = await this.UserORM.findOne({
                where:{
                    login:login.toLowerCase()
                }
            })
            
            if(!user){
                throw new Error('Ошибка работы с базой данных')
            }
            return user
        }catch(error){
            return null
        }
    }
    
}
