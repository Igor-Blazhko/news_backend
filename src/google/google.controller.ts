import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
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
    // console.log(req.headers.referer);
    const domain = req.headers.referer;
    const answer = await this.AuthService.googleAuthorization(req.user);
    res.cookie('accessToken', answer.access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    res.cookie('refresh_token', answer.refresh_token, {
      expires: new Date(new Date().getTime() + 300 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    // res.setHeader('access_token', answer.access_token);
    // res.setHeader('refresh_token', answer.refresh_token);
    //res.send(JSON.stringify(answer));
    return res.redirect(domain);
    //return this.AuthService.googleAuthorization(req.user);
  }
}
