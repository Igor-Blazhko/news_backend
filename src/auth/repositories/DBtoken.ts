import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenRepositories {
  private data: string[];
  private timer: number;

  constructor() {
    this.data = [];
    this.timer = +process.env.LIFE_REFRESH_TOKEN || 3600 * 1000;
  }

  async createToken() {
    const prhase: string = uuid.v4();
    prhase.replace('$', '');
    const token: string = await bcrypt.hash(prhase, 10);
    this.data.push(token);
    this.deleteToken(token);
    return token;
  }

  verifyToken(token: string) {
    return this.data.some((item) => item === token);
  }

  private deleteToken(token) {
    setTimeout(() => {
      this.data = this.data.filter((item) => item !== token);
    }, this.timer);
  }

  get getStorage() {
    return this.data;
  }

  set dropToken(token) {
    this.data = this.data.filter((item) => item !== token);
  }
}
