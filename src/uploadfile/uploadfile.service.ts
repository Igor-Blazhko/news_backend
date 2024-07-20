import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './model/uploadfile.model';
import * as paths from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class UploadfileService {
  constructor(@InjectModel(Image) private ImageORM: typeof Image) {}

  async saveFilePath(File: Express.Multer.File): Promise<Image | Error> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = paths.resolve(__dirname, '../..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const readyPath = paths.resolve(filePath, fileName);
      return new Promise<Image>(async (resolve) => {
        await fs.writeFile(readyPath, File.buffer, () => {});
        const response = await this.ImageORM.create({
          path: process.env.HOST + fileName,
        });
        if (!(response instanceof Image)) {
          throw new HttpException(
            'Ошибка записи файла в БД',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        resolve(response);
      });
    } catch (e) {
      return e;
    }
  }

  savePath(path: string) {
    return this.ImageORM.create({ path });
  }

  async getFileById(id: number): Promise<Image> {
    return this.ImageORM.findOne({
      where: {
        id: id,
      },
    });
  }
}
