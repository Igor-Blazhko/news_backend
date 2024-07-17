import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService as AuthS } from './auth.service';
import { ObjectToken, signInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/users.dto';

@ApiTags('Авторизация')
@Controller('auth/')
export class AuthController {
  constructor(private AuthService: AuthS) {}

  @ApiOperation({ summary: 'Auth user' })
  @ApiResponse({ status: 200, type: ObjectToken })
  @Post('login')
  signIn(@Body() signInDTO: signInDto): Promise<ObjectToken> {
    const login = signInDTO.login;
    const password = signInDTO.password;
    return this.AuthService.signIn(login, password);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: ObjectToken })
  @Post('registration')
  async CreateUser(
    @Body() registerDTO: CreateUserDto,
  ): Promise<ObjectToken | HttpException> {
    return this.AuthService.CreateUser(registerDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
