import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    SequelizeModule.forFeature([User]),
    JwtModule.register( {
      secret: process.env.SECRET_KEY ||'SECRET',
      signOptions:{
        expiresIn:'24h'
      }
    } )
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
