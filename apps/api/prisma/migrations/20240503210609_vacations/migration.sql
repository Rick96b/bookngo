/*
  Warnings:

  - You are about to drop the column `vacations-id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "vacations-id";

-- AlterTable
ALTER TABLE "Vacation" ADD COLUMN     "employee-id" INTEGER NOT NULL DEFAULT 0;
