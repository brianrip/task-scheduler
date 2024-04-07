import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
  @ApiProperty()
  accountId: number;

  @ApiProperty()
  agentId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;
}
