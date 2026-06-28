-- AlterTable
ALTER TABLE "VehicleState" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "current_odometer" DROP NOT NULL;
