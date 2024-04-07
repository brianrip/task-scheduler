import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from "../prisma/prisma.service";

describe('SchedulesService', () => {
  let service: SchedulesService;
  const schedulesArray = [
    {
      id: "1",
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime:  new Date(),
    },
  ];
  const db = {
    schedule: {
      findMany: jest.fn().mockResolvedValue(schedulesArray),
      findUnique: jest.fn().mockResolvedValue(schedulesArray[0]),
      create: jest.fn().mockReturnValue(schedulesArray[0]),
      update: jest.fn().mockResolvedValue(schedulesArray[0]),
      delete: jest.fn().mockResolvedValue(schedulesArray[0]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ]
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
