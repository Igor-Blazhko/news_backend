import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@ApiTags( 'Авторизация' )
@Controller('auth')
export class AuthController {

    constructor(private AuthService:AuthService){}

}
