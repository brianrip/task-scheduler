import { Task, TaskType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TaskEntity implements Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  type: TaskType;

  @ApiProperty()
  scheduleId: string;
}
