-- CreateTable
CREATE TABLE "<esquema>"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "horario" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_horario_key" ON "<esquema>"."User"("horario");

-- CreateIndex
CREATE UNIQUE INDEX "User_data_key" ON "<esquema>"."User"("data");
