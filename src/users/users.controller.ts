import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/users.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService as JWTs } from '@nestjs/jwt';
import { UpdateUserWithUserDto, UserWithoutPass } from './dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddUser } from 'src/auth/adduser.inceptor';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private UserService: UsersService,
    private JwtService: JWTs,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user for login' })
  @ApiResponse({ status: 200, type: User })
  @Get(':login')
  async getUser(@Param('login') login: string): Promise<Error | User> {
    return this.UserService.getUserAtLogin(login);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getUserById(
    @Query('id', ParseIntPipe) id: number,
  ): Promise<HttpException | UserWithoutPass> {
    return this.UserService.getUserById(+id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(AddUser)
  @UseInterceptors(FileInterceptor('img'))
  @Patch()
  updateUser(
    @Body() updateDTO: UpdateUserWithUserDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.UserService.updateUser(updateDTO, img);
  }
}
