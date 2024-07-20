import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleService as GoogleS } from './google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly GoogleService: GoogleS) {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:5000/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    //const user = await this.GoogleService.validateUser(profile);
    const { name, emails, photos } = profile;
    const user = {
      login: emails[0].value,
      name: name.givenName,
      sername: name.familyName,
      picturePath: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
