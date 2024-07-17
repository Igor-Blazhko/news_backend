import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateUserDto,
  UpdateUserWithImgDto,
  UpdateUserWithUserDto,
  UserWithoutPass,
} from './dto/users.dto';
import { UploadfileService } from 'src/uploadfile/uploadfile.service';
import { Image } from 'src/uploadfile/model/uploadfile.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserORM: typeof User,
    private UploadService: UploadfileService,
  ) {}

  async CreateUser(userBodyRegister: CreateUserDto): Promise<Error | User> {
    try {
      const userBodyRegisterModifed: CreateUserDto = {
        ...userBodyRegister,
        login: userBodyRegister.login.toLowerCase(),
      };

      const user = await this.UserORM.create(userBodyRegisterModifed);
      if (!(user instanceof User)) {
        throw new HttpException(
          'Ошибка работы с базой данных во время добавления',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async getUserAtLogin(login: string): Promise<Error | User> {
    try {
      const user = await this.UserORM.findOne({
        where: {
          login: login.toLowerCase(),
        },
      });

      if (!user) {
        throw new Error('Ошибка работы с базой данных');
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserById(id: number): Promise<UserWithoutPass | HttpException> {
    try {
      const user = await this.UserORM.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
      });
      if (user instanceof User) {
        delete user.password;
        return user;
      }
      throw new HttpException(
        'Ошибка базы данных',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (err) {
      return err;
    }
  }

  async updateUser(
    updateDTO: UpdateUserWithUserDto,
    file: Express.Multer.File,
  ) {
    try {
      const imgFile: Image | Error =
        await this.UploadService.saveFilePath(file);
      if (!(imgFile instanceof Image))
        throw new HttpException('er', HttpStatus.INTERNAL_SERVER_ERROR);

      console.log('AllDTO=', updateDTO);
      console.log('imgId=', imgFile.id);
      const updateModifedDTO: UpdateUserWithImgDto = {
        name: updateDTO.name,
        sername: updateDTO.sername,
        avatarId: Number(imgFile.id),
      };
      console.log('DTO: ', updateModifedDTO);
      const status = await this.UserORM.update(updateModifedDTO, {
        where: { id: updateDTO.User.id },
      });
      console.log('status', status);
      if (!status)
        throw new HttpException(
          'Ошибка работы БД',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      return status;
    } catch (err) {
      return err;
    }
  }
}
