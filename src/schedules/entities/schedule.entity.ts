import { Schedule } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class ScheduleEntity implements Schedule {
  @ApiProperty()
  id: string;

  @ApiProperty()
  accountId: number;

  @ApiProperty()
  agentId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
