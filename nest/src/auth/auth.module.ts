import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './delete.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService], // registre ele aqui
})
export class AuthModule {}
