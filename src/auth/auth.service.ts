import { HttpException, HttpStatus, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { ObjectToken } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(private UserService:UsersService,
                private JwtService:JwtService,
    ){}

    async signIn( login:string, password:string ): Promise < ObjectToken > {
        try{
            const user:User|Error = await this.UserService.getUserAtLogin(login);
        
            if ((user instanceof User) && ( !bcrypt.compare( user.password , password) )) {
                throw new UnauthorizedException()
            }
            
            if (user instanceof User){
                const payload = {
                    sub:user.id,
                    login:user.login,
                    name:user.name,
                    sername:user.sername,
                }
                const token = await this.JwtService.signAsync(payload)
                return {
                    access_token:token
                }
            } 
        }
        catch(error){
            return error
        }      
    }

    async CreateUser(userBodyRegister:CreateUserDto){
        try{
            const candidate:User|Error = await this.UserService.getUserAtLogin(userBodyRegister.login);

            if(candidate){
                throw new HttpException('Пользователь существует',HttpStatus.BAD_REQUEST)
            }
    
            const hashPassword = await bcrypt.hash( userBodyRegister.password, 5 )
    
            const user:User|Error = await this.UserService.CreateUser({ ...userBodyRegister, password:hashPassword})
    
            if(user instanceof User){
                return  this.signIn(user.login, user?.password)
            }

        }
        catch(error){
            throw new HttpException('Ошибка работы с базой данных', HttpStatus.BAD_REQUEST)
        }
        
    }
}
