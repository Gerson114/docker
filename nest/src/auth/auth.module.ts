import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteModule } from 'src/delete/delete.module';


@Module({
  imports:[DeleteModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, ], // registre ele aqui
})
export class AuthModule {}
