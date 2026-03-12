-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "imei" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);
