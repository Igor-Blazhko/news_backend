import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { User } from './models/users.model';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private UserService:UsersService,){}

    @ApiOperation( { summary: 'Create user' } )
    @ApiResponse( { status: 200, type: User } )
    @Post()
    async CreateUser(@Body() registerDTO:CreateUserDto):Promise<Error|User>{
        return this.UserService.CreateUser(registerDTO)
    }

    @ApiOperation( { summary: 'Get user for login' } )
    @ApiResponse( { status: 200, type: User } )
    @Get(':login')
    async getUser(@Param('login') login:string):Promise<Error|User>{
        return this.UserService.getUserAtLogin(login)
    }
}
