import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteService } from './delete.service';

@Module({
  providers: [DeleteService, PrismaService],
  exports: [DeleteService],
})
export class DeleteModule {}
