import { PrismaClient, TaskType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create schedules
  const schedule1 = await prisma.schedule.upsert({
    where: { accountId: 1 },
    update: {},
    create: {
      accountId: 1,
      agentId: 1,
      startTime: new Date(),
      endTime: new Date(),
      tasks: {
        create: [
          { accountId: 1, startTime: new Date(), duration: 60, type: TaskType.WORK },
          {
            accountId: 1,
            startTime: new Date(),
            duration: 30,
            type: TaskType.BREAK,
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });

  const schedule2 = await prisma.schedule.upsert({
    where: { accountId: 2 },
    update: {},
    create: {
      accountId: 2,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
      tasks: {
        create: [
          { accountId: 2, startTime: new Date(), duration: 90, type: TaskType.WORK },
          {
            accountId: 2,
            startTime: new Date(),
            duration: 45,
            type: TaskType.BREAK,
          },
        ],
      },
    },
    include: {
      tasks: true,
    },
  });

  console.log("Schedules and tasks created:", { schedule1, schedule2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
