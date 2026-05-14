/*
  Warnings:

  - A unique constraint covering the columns `[vehicle_id]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "devices_vehicle_id_key" ON "devices"("vehicle_id");
