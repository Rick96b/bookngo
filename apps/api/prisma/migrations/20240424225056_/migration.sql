/*
  Warnings:

  - A unique constraint covering the columns `[company-name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_company-name_key" ON "Company"("company-name");
