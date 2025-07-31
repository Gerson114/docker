import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { DeleteService } from './delete/delete.service';
import { DeleteModule } from './delete/delete.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [AuthModule, DeleteModule, UsersModule, ],
  controllers: [],
  providers: [PrismaService, DeleteService],
})
export class AppModule {}
