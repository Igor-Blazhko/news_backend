import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './model/uploadfile.model';
import * as paths from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class UploadfileService {
  constructor(@InjectModel(Image) private ImageORM: typeof Image) {}

  async saveFilePath(File: Express.Multer.File) {
    const fileName = uuid.v4() + '.jpg';
    const filePath = paths.resolve(__dirname, '../..', 'static');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const readyPath = paths.join(filePath, fileName);
    fs.writeFileSync(readyPath, File.buffer);
    return this.ImageORM.create({ path: readyPath, UserId: 1 });
  }
}
