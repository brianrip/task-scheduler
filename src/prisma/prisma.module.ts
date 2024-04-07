import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Responsible for creating singleton of the PrismaClient
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
