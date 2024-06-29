import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { User } from './models/users.model';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private UserService:UsersService,
                private JwtService:JwtService,
    ){}

    
    
    @UseGuards(AuthGuard)
    @ApiOperation( { summary: 'Get user for login' } )
    @ApiResponse( { status: 200, type: User } )
    @Get(':login')
    async getUser(@Param('login') login:string):Promise<Error|User>{
        return this.UserService.getUserAtLogin(login)
    }
}
