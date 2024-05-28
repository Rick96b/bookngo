import { Controller, Post,Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, UserLoginDto } from '@common';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post('signUp/user')
  @HttpCode(200)
  async signUpUser(@Body() dto: UserDto) {
    return this._authService.registerUser(dto)
  }
  @Post('signUp/ceo')
  @HttpCode(200)
  async signUp(@Body() dto: UserDto) {
    return this._authService.registerCeo(dto)
  }
  @Post('signIn')
  @HttpCode(200)
  async signIn(@Body() dto: UserLoginDto) {
    return this._authService.login(dto);
  }

}
