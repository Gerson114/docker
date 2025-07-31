import { IsEmail, IsNotEmpty } from 'class-validator';

export class CancelUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
