import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './model/uploadfile.model';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  providers: [UploadfileService],
  controllers: [UploadfileController],
})
export class UploadfileModule {}
