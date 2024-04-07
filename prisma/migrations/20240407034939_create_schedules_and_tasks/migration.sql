-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('WORK', 'BREAK');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "TaskType",
    "schedule_id" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_account_id_key" ON "Schedule"("account_id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
