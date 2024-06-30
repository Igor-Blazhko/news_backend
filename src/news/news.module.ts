import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { New } from './model/news,.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[
    SequelizeModule.forFeature([New]),
    JwtModule,
  ],
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
