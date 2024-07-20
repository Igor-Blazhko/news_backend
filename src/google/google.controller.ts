import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService as AuthS } from 'src/auth/auth.service';

@Controller('google')
export class GoogleController {
  constructor(private AuthService: AuthS) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return null;
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const domain = req.headers.referer;
    const answer = await this.AuthService.googleAuthorization(req.user);
    res.cookie('access_token', answer.access_token, {
      expires: new Date(new Date().getTime() + +process.env.LIFE_ACCESS_TOKEN),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.cookie('refresh_token', answer.refresh_token, {
      expires: new Date(new Date().getTime() + +process.env.LIFE_REFRESH_TOKEN),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.redirect(domain);
  }
}
