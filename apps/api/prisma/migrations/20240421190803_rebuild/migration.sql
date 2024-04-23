-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegram-username" TEXT NOT NULL DEFAULT '',
    "phone-number" TEXT NOT NULL DEFAULT '',
    "company-name" TEXT NOT NULL,
    "company-department" TEXT,
    "employment-status" TEXT NOT NULL DEFAULT 'employee',
    "vacations-id" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "accumulated-vacation-days" INTEGER DEFAULT 0,
    "compensation-days" INTEGER DEFAULT 0,
    "vacation-balance" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
