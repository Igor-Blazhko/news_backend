import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService as JWTS } from '@nestjs/jwt';
import { createUser, User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { ObjectToken } from './dto/auth.dto';
import {
  CreateUserDto,
  GoogleUser,
  UserWithoutPass,
} from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokenRepositories } from './repositories/DBtoken';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as uuid from 'uuid';
import { UploadfileService } from 'src/uploadfile/uploadfile.service';
const streamPipeline = promisify(pipeline);
@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private JwtService: JWTS,
    private RefreshToken: RefreshTokenRepositories,
    private UploadFileService: UploadfileService,
  ) {}

  async signIn(login: string, password: string): Promise<ObjectToken> {
    try {
      const user: User | Error = await this.UserService.getUserAtLogin(login);

      if (user instanceof User && !bcrypt.compare(user.password, password)) {
        throw new UnauthorizedException();
      }

      if (user instanceof User) {
        const payload = {
          id: user.id,
          login: user.login,
          name: user.name,
          sername: user.sername,
          avatarId: user.avatarId,
        };
        const token = await this.JwtService.signAsync(payload);
        const refresh = await this.RefreshToken.createToken();
        return {
          access_token: token,
          refresh_token: refresh,
        };
      }
    } catch (error) {
      return error;
    }
  }

  async CreateUser(
    userBodyRegister: CreateUserDto | createUser,
  ): Promise<ObjectToken> {
    try {
      const candidate: User | Error = await this.UserService.getUserAtLogin(
        userBodyRegister.login,
      );

      if (candidate) {
        throw new HttpException(
          'Пользователь существует',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashPassword = await bcrypt.hash(userBodyRegister.password, 5);

      const user: User | Error = await this.UserService.CreateUser({
        ...userBodyRegister,
        password: hashPassword,
      });
      if (user instanceof User) {
        return await this.signIn(user.login, user?.password);
      } else {
        throw new HttpException(
          'Ошибка работы с базой данных',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      return error;
    }
  }

  async GetUserByToken(Token): Promise<UserWithoutPass> {
    return await this.JwtService.verify(Token);
  }

  async googleAuthorization(user: GoogleUser): Promise<ObjectToken> {
    try {
      const candidate = await this.UserService.getUserAtLogin(user.login);
      if (candidate && candidate instanceof User)
        return this.signIn(candidate.login, candidate.password);
      else if (candidate)
        throw new HttpException(
          'Ошибка работы с БД',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const userDTO: createUser = {
        name: user.name,
        sername: user.sername,
        login: user.login,
        avatarId: null,
        password: 'sercretPasswordKeyasjdklajTdkjXsdlkJnAal!asdkl$',
      };

      const res = await fetch(user.picturePath);
      if (res.ok) {
        const fileName = uuid.v4() + '.jpg';
        const serverPath = process.env.HOST + fileName;
        const pathFile = path.resolve(__dirname, '../..', 'static', fileName);
        const buffer = fs.createWriteStream(pathFile);
        await streamPipeline(res.body, buffer);
        const newImg = await this.UploadFileService.savePath(serverPath);
        userDTO.avatarId = newImg.id;
      }

      return await this.CreateUser(userDTO);
    } catch (err) {
      return err;
    }
  }

  getData() {
    return this.RefreshToken.getStorage;
  }
}
