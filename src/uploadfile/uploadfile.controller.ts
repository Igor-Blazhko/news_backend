import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploadfileService } from './uploadfile.service';

@Controller('uploadfile')
export class UploadfileController {
  constructor(private UploadService: UploadfileService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savedFile = await this.UploadService.saveFilePath(file);
    return savedFile;
  }
}
