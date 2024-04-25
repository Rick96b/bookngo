-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ceo-id" INTEGER NOT NULL,
    "departments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "employees-id" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" SERIAL NOT NULL,
    "employee-id" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "vacation-duration" INTEGER NOT NULL,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);
