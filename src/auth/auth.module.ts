import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenRepositories } from './repositories/DBtoken';
import { UploadfileModule } from 'src/uploadfile/uploadfile.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenRepositories],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    UploadfileModule,
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
