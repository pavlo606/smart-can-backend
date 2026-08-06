/*
  Warnings:

  - You are about to drop the `VehicleState` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `secretHash` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('AVAILABLE', 'ACTIVE', 'DISABLED');

-- DropForeignKey
ALTER TABLE "VehicleState" DROP CONSTRAINT "VehicleState_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "devices" ADD COLUMN     "secretHash" TEXT NOT NULL,
ALTER COLUMN "vehicle_id" DROP NOT NULL;

-- DropTable
DROP TABLE "VehicleState";

-- CreateTable
CREATE TABLE "vehicle_state" (
    "vehicle_id" TEXT NOT NULL,
    "last_seen" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "rpm" INTEGER,
    "coolant_temp" INTEGER,
    "fuel_level" DOUBLE PRECISION,
    "current_odometer" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_state_pkey" PRIMARY KEY ("vehicle_id")
);

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_state" ADD CONSTRAINT "vehicle_state_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
