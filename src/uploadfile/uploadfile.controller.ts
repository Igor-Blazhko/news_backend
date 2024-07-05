import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { UploadfileService } from './uploadfile.service';
import { Image } from './model/uploadfile.model';
import * as path from 'path';

@Controller('uploadfile')
export class UploadfileController {
  constructor(private UploadService: UploadfileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savedFile = await this.UploadService.saveFilePath(file);
    return savedFile;
  }

  @Get('download')
  async downloadFile(@Query('id') id: number, @Res() response: Response) {
    const pathFile: Image = await this.UploadService.getFileById(id);
    const pathReady = path.join(__dirname, '../..', 'static', pathFile.path);
    return response.download(pathReady);
  }
}
