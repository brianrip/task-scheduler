import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { PrismaService } from "../prisma/prisma.service";


describe('SchedulesController', () => {
  let controller: SchedulesController;
  const schedulesArray = [
    {
      id: "1",
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: "2",
      accountId: 2,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
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
      controllers: [
        SchedulesController,
      ],
      providers: [
        SchedulesService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('create() should return newly created schedule', () => {
    expect(controller.create({
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    })).toEqual(schedulesArray[0]);
  });

  it('findAll() should return all schedules', () => {
    expect(controller.findAll()).resolves.toEqual(schedulesArray);
  });
  
  it('findOne() should return one schedule', () => {
    expect(controller.findOne("1")).resolves.toEqual(schedulesArray[0]);
  });

  it('update() should return updated schedule', () => {
    expect(controller.update("1", {
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    })).resolves.toEqual(schedulesArray[0]);
  });
  
  it('remove() should return removed schedule', () => {
    expect(controller.remove("1")).resolves.toEqual(schedulesArray[0]);
  });
});
