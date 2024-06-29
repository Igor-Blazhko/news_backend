import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ObjectToken, signInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/models/users.model';
import { CreateUserDto } from 'src/users/dto/users.dto';

@ApiTags( 'Авторизация' )
@Controller('auth/')
export class AuthController {

    constructor(private AuthService:AuthService){}

    
    @ApiOperation( { summary: 'Auth user' } )
    @ApiResponse( { status: 200, type: ObjectToken } )
    @Post('login')
    signIn(@Body() signInDto:signInDto): Promise<ObjectToken>{
        const login = signInDto.login;
        const password = signInDto.password;
        return this.AuthService.signIn(login, password)
    }

    @ApiOperation( { summary: 'Create user' } )
    @ApiResponse( { status: 200, type: ObjectToken } )
    @Post('registration')
    async CreateUser(@Body() registerDTO:CreateUserDto):Promise<ObjectToken>{
        return this.AuthService.CreateUser(registerDTO)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

}
