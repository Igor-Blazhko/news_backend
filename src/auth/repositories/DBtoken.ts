import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';

interface refreshToken {
  id: number;
  token: string;
}
@Injectable()
export class RefreshTokenRepositories {
  private data: refreshToken[];
  private timer: number;

  constructor() {
    this.data = [];
    this.timer = +process.env.LIFE_REFRESH_TOKEN || 3600 * 1000;
  }

  async createToken(userId: number) {
    const prhase: string = uuid.v4();
    const token: string = await bcrypt.hash(prhase, 10);
    this.data.push({
      id: +userId,
      token: token,
    });
    this.deleteToken(token);
    return token;
  }

  verifyToken(token: string) {
    return this.data.some((item) => item.token === token);
  }
  getUserIdbyToken(token) {
    return this.data.find((item) => item.token === token).id;
  }
  private deleteToken(token) {
    setTimeout(() => {
      this.data = this.data.filter((item) => item.token !== token);
    }, this.timer);
  }

  get getStorage() {
    return this.data;
  }

  set dropToken(token) {
    this.data = this.data.filter((item) => item.token !== token);
  }
}
