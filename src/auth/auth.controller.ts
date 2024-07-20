import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService as AuthS } from './auth.service';
import { ObjectToken, signInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { Request as Req, Response } from 'express';
import { AddUser } from './adduser.inceptor';
import { UsersService } from 'src/users/users.service';

@ApiTags('Авторизация')
@Controller('auth/')
export class AuthController {
  constructor(
    private AuthService: AuthS,
    private UserService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Auth user' })
  @ApiResponse({ status: 200, type: ObjectToken })
  @Post('login')
  async signIn(@Body() signInDTO: signInDto) {
    const login = signInDTO.login;
    const password = signInDTO.password;
    const answer = await this.AuthService.signIn(login, password);
    //this.setToken(res, answer);
    return answer;
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: ObjectToken })
  @Post('registration')
  async CreateUser(@Body() registerDTO: CreateUserDto) {
    const answer = await this.AuthService.CreateUser(registerDTO);
    //this.setToken(res, answer);
    return answer;
  }

  @UseInterceptors(AddUser)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Req) {
    return this.UserService.getUserById(req.body.User.id);
  }
  @Get('refreshToken')
  refreshAccessToken(@Query('token') token: string) {
    return this.AuthService.refreshAccessToken(token);
  }

  private setToken(res: Response, objTokens: ObjectToken) {
    res.cookie('access_token', objTokens.access_token, {
      expires: new Date(new Date().getTime() + +process.env.LIFE_ACCESS_TOKEN),
      secure: false,
      sameSite: 'lax',
      httpOnly: true,
    });
    res.cookie('refresh_token', objTokens.refresh_token, {
      expires: new Date(new Date().getTime() + +process.env.LIFE_REFRESH_TOKEN),
      secure: false,
      sameSite: 'lax',
      httpOnly: true,
    });
    return res;
  }
}
