import axios from 'axios';
import { exec } from 'child_process';
import { CreateScheduleDto } from 'src/schedules/dto/create-schedule.dto';
import { Schedule, Task } from "@prisma/client";
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { UpdateScheduleDto } from 'src/schedules/dto/update-schedule.dto';

describe('Integration Test', () => {
  const schedulesUrl = 'http://localhost:3000/schedules';
  const tasksUrl = 'http://localhost:3000/tasks';

  beforeAll(async () => {
    await new Promise((resolve, reject) => {
      exec("yarn db:reset", (error, stdout) => {
        if (error) {
          console.error(`Error executing reset script: ${error}`);
          reject(error);
        }
        console.log(`Reset script output: ${stdout}`);
        resolve(stdout);
      });
    });
  });

  let newSchedule: Schedule
  let newTask: Task
  it('POST /schedules should create a new schedule', async () => {
    const newScheduleParams: CreateScheduleDto = {
      accountId: 3,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
    };

    const response = await axios.post(schedulesUrl, newScheduleParams);
    newSchedule = response.data;

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.accountId).toBe(newSchedule.accountId);
    expect(response.data.agentId).toBe(newSchedule.agentId);
  });

  it('POST /tasks should create a new task with associated schedule', async () => {
    const newTaskParams: CreateTaskDto = {
      accountId: 3,
      startTime: new Date(),
      duration: 60,
      type: 'WORK',
      scheduleId: newSchedule.id,
    };

    const response = await axios.post(tasksUrl, newTaskParams);
    newTask = response.data;
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.accountId).toBe(newTask.accountId);
    expect(response.data.duration).toBe(newTask.duration);
  });

  it('GET /schedules should get all schedules with associated tasks', async () => {
    const response = await axios.get(schedulesUrl);
    
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data[0].tasks).toBeInstanceOf(Array);
    expect(response.data[0].tasks[0]?.id).toEqual(newTask.id);
  });

  it('GET /schedules/:id should get a specific schedule with tasks', async () => {
    const response = await axios.get(`${schedulesUrl}/${newSchedule.id}`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(newSchedule.id);
    expect(response.data.tasks[0]?.id).toBe(newTask.id);
  });

  it('PATCH /schedules should update an existing schedule', async () => {
    const updatedSchedule: UpdateScheduleDto = {
      agentId: 5,
    };

    const response = await axios.patch(
      `${schedulesUrl}/${newSchedule.id}`,
      updatedSchedule
    );
    newSchedule = response.data;
    expect(response.status).toBe(200);
    expect(response.data.agentId).toBe(updatedSchedule.agentId);
  });

  it('PATCH /tasks should update an existing task', async () => {
    const updatedTask: UpdateTaskDto = {
      duration: 10000,
    };

    const response = await axios.patch(
      `${tasksUrl}/${newTask.id}`,
      updatedTask
    );
    newTask = response.data;
    expect(response.status).toBe(200);
    expect(response.data.duration).toBe(updatedTask.duration);
  });

  it('DELETE /schedule should delete a schedule and associated tasks', async () => {
    const scheduleResponse = await axios.delete(`${schedulesUrl}/${newSchedule.id}`);
    expect(scheduleResponse.status).toBe(200);
    expect(scheduleResponse.data).toHaveProperty('id', newSchedule.id);

    try {
      await axios.get(`${tasksUrl}/${newTask.id}`)
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
