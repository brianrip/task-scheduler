import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './entities/task.entity';
import { PrismaService } from '../prisma/prisma.service';
import { TaskType } from '@prisma/client';

describe('TasksController', () => {
  let controller: TasksController;
  const tasksArray: TaskEntity[] = [
    {
      id: "1",
      accountId: 1,
      startTime: new Date(),
      duration: 1000,
      type: TaskType.BREAK,
      scheduleId: "1",
    },
    {
      id: "1",
      accountId: 1,
      startTime: new Date(),
      duration: 1000,
      type: TaskType.WORK,
      scheduleId: "1",
    },
  ];

  const db = {
    task: {
      findMany: jest.fn().mockResolvedValue(tasksArray),
      findUnique: jest.fn().mockResolvedValue(tasksArray[0]),
      create: jest.fn().mockReturnValue(tasksArray[0]),
      update: jest.fn().mockResolvedValue(tasksArray[0]),
      delete: jest.fn().mockResolvedValue(tasksArray[0]),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it("create() should return newly created task", () => {
    expect(
      controller.create({
        accountId: 1,
        startTime: new Date(),
        duration: 1000,
        type: TaskType.WORK,
        scheduleId: "1",
      })
    ).toEqual(tasksArray[0]);
  });

  it("findAll() should return all tasks", () => {
    expect(controller.findAll()).resolves.toEqual(tasksArray);
  });

  it("findOne() should return one task", () => {
    expect(controller.findOne("1")).resolves.toEqual(tasksArray[0]);
  });

  it("update() should return updated task", () => {
    expect(
      controller.update("1", {
        accountId: 1,
        startTime: new Date(),
        duration: 1000,
        type: TaskType.WORK,
        scheduleId: "1",
      })
    ).resolves.toEqual(tasksArray[0]);
  });

  it("remove() should return removed task", () => {
    expect(controller.remove("1")).resolves.toEqual(tasksArray[0]);
  });});
