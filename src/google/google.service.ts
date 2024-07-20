import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  constructor() {}
  validateUser(profile) {
    return { ...profile };
  }
}
