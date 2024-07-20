import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
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
  async signIn(@Body() signInDTO: signInDto, @Res() res: Response) {
    const login = signInDTO.login;
    const password = signInDTO.password;
    const answer = await this.AuthService.signIn(login, password);
    res.cookie('access_token', answer.access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.cookie('refresh_token', answer.refresh_token, {
      expires: new Date(new Date().getTime() + 300 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.status(204).end();
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: ObjectToken })
  @Post('registration')
  async CreateUser(@Body() registerDTO: CreateUserDto, @Res() res: Response) {
    const answer = await this.AuthService.CreateUser(registerDTO);
    res.cookie('access_token', answer.access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.cookie('refresh_token', answer.refresh_token, {
      expires: new Date(new Date().getTime() + 300 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.status(204).end();
  }

  @UseInterceptors(AddUser)
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Req) {
    return this.UserService.getUserById(req.body.User.id);
  }

  @Get('data')
  getData() {
    return this.AuthService.getData();
  }
}
