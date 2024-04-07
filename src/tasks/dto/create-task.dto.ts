import { ApiProperty } from "@nestjs/swagger";

// Would use library Joi in production
export class CreateTaskDto {
  @ApiProperty()
  accountId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  scheduleId: string | never;
}
