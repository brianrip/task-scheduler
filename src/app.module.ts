import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, SchedulesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
