import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private TaskRepository:typeof User){}

    async CreateUser(userBodyRegister:CreateUserDto):Promise<Error|User>{
        try{
            let userBodyRegisterModifed:CreateUserDto = {
                ...userBodyRegister,
                login:userBodyRegister.login.toLowerCase(),
            }

            const user = this.TaskRepository.create(userBodyRegisterModifed)
            if(!user){
                throw new Error('Ошибка работы с базой данных')
            }
            return user
        }catch(error){
            return error
        }
    }

    async getUserAtLogin(login:string):Promise<Error|User>{
        try{
            const user = this.TaskRepository.findOne({
                where:{
                    login:login.toLowerCase()
                }
            })
            if(!user){
                throw new Error('Ошибка работы с базой данных')
            }
            return user
        }catch(error){
            return error
        }
    }
    
}
