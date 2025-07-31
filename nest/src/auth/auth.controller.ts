import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/auth/dtos/auth';
import { CancelUserDto } from '../delete/dtos/cancel-user.dtos';
import { DeleteService } from 'src/delete/delete.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private deleteService: DeleteService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('cancel')
  async cancelUser(@Body() body: CancelUserDto) {
    const result = await this.deleteService.deleteUserByNameEmail(body.name, body.email);

    if (result.count === 0) {
      return { message: 'Usuário não encontrado.' };
    }

    return { message: 'Usuário deletado com sucesso.' };
  }



  
}
