/*
  Warnings:

  - Added the required column `initial_odometer` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "initial_odometer" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tracker_distance" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "service_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_record" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "service_type_id" TEXT NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL,
    "performed_odometer" DOUBLE PRECISION,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_interval" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "service_type_id" TEXT NOT NULL,
    "interval_km" DOUBLE PRECISION NOT NULL,
    "interval_days" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_interval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleState" (
    "vehicle_id" TEXT NOT NULL,
    "last_seen" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION,
    "rpm" INTEGER,
    "coolant_temp" INTEGER,
    "fuel_level" DOUBLE PRECISION,
    "current_odometer" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleState_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_interval_vehicle_id_service_type_id_key" ON "service_interval"("vehicle_id", "service_type_id");

-- CreateIndex
CREATE INDEX "telemetry_timestamp_idx" ON "telemetry"("timestamp");

-- AddForeignKey
ALTER TABLE "service_record" ADD CONSTRAINT "service_record_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_record" ADD CONSTRAINT "service_record_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "service_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_interval" ADD CONSTRAINT "service_interval_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_interval" ADD CONSTRAINT "service_interval_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "service_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleState" ADD CONSTRAINT "VehicleState_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
