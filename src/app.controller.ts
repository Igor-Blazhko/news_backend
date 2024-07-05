import { Controller, Get } from '@nestjs/common';

@Controller('App')
export class AppController {
  @Get()
  async loadApp() {
    return 'Your app is ready for user';
  }
}
