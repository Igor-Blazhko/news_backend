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
            const responseDB = this.TaskRepository.create(userBodyRegisterModifed)
            if(!responseDB){
                throw new HttpException('Ошибка работы с базой данных', HttpStatus.BAD_REQUEST)
            }
            return responseDB
        }catch(error){
            return error
        }
    }

    async getUserAtLogin(login:string):Promise<Error|User>{
        try{
            const responseDB = this.TaskRepository.findOne({
                where:{
                    login:login.toLowerCase()
                }
            })
            if(!responseDB){
                throw new Error('Ошибка работы с базой данных')
            }
            return responseDB
        }catch(error){
            return error
        }
    }
    
}
