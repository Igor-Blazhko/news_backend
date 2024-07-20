import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleStrategy } from './googleStrategy';

@Module({
  providers: [GoogleService, GoogleStrategy],
  controllers: [GoogleController],
  imports: [AuthModule],
})
export class GoogleModule {}
