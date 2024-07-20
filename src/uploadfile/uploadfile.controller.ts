import { Controller, Get, ParseIntPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UploadfileService } from './uploadfile.service';
import { Image } from './model/uploadfile.model';
import * as path from 'path';

@Controller('uploadfile')
export class UploadfileController {
  constructor(private UploadService: UploadfileService) {}

  @Get()
  getFileById(@Query('id', ParseIntPipe) id: number) {
    return this.UploadService.getFileById(id);
  }
  @Get('download')
  async downloadFile(@Query('id') id: number, @Res() response: Response) {
    const pathFile: Image = await this.UploadService.getFileById(id);
    const pathReady = path.join(__dirname, '../..', 'static', pathFile.path);
    return response.download(pathReady);
  }
}
