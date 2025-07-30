import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/dtos/auth';
import { UserService } from './delete.service';  // seu serviço de delete

class CancelUserDto {
  name: string;
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    console.log({ body });
    return this.authService.signup(body);
  }

  @Post('cancel')
  async cancelUser(@Body() body: CancelUserDto) {
    const { name, email } = body;
    const result = await this.userService.deleteUserByNameEmail(name, email);

    if (result.count === 0) {
      return { message: 'Usuário não encontrado para esses dados.' };
    }

    return { message: 'Usuário deletado com sucesso.' };
  }
}
