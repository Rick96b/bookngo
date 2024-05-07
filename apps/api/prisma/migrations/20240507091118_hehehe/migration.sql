/*
  Warnings:

  - You are about to drop the column `vacation-duration` on the `Vacation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "vacation-duration",
ALTER COLUMN "start" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "end" SET DATA TYPE TIMESTAMP(3);
