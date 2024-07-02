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
    try{
      const fileName = uuid.v4() + '.jpg';
      const filePath = paths.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const readyPath = paths.join(filePath, fileName);
      const readingFile = fs.createReadStream(File.path)
      const writingFile = fs.createWriteStream(readyPath)
      

      return new Promise<Image>((resolve, reject) => {
        const errorStream = ():void => {
          readingFile.destroy();
          writingFile.end('error stream');
          reject(new HttpException('Ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        readingFile
        .on('error', errorStream)
        .pipe(writingFile)
        .on('error', errorStream)
        .on('finish', async() => {
          try {
            const response = await this.ImageORM.create({ path: readyPath });
            if (!(response instanceof Image)) {
              reject(new HttpException('Ошибка записи файла в БД', HttpStatus.INTERNAL_SERVER_ERROR));
            }
            resolve(response);
          } catch (error) {
            reject(new HttpException('Ошибка при сохранении изображения в БД', HttpStatus.INTERNAL_SERVER_ERROR));
          }
        })
      })
      // await fs.writeFile(readyPath, File.buffer, () => {});
      // await fs.writeFile(filePathServer, File.buffer, () => {});
      // const createRecordDB =  new Promise<Image>(async(resolve, reject) => {
      //   const response = await this.ImageORM.create({ path: readyPath });
      //   if (response instanceof Image){
      //     resolve(response)
      //   }
      //   else {
      //     throw new HttpException('Ошибка записи файла' , HttpStatus.INTERNAL_SERVER_ERROR)
      //   }
      // })
      // const responseDB = await this.ImageORM.create({ path: readyPath });
      // if (!(responseDB instanceof Image)){
      //   throw new HttpException('Ошибка записи файла' , HttpStatus.INTERNAL_SERVER_ERROR)
      // }
      // return  Promise.all([createRecordDB])[0]
    }catch(e){
      return e
    }
  }

  async getFileById(id:number):Promise<Image>{
    return this.ImageORM.findOne({
      where:{
        id: id,
      }
    })
  }
}
