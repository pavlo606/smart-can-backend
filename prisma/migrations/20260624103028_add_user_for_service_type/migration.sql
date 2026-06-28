/*
  Warnings:

  - Added the required column `user_id` to the `service_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_type" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "service_type" ADD CONSTRAINT "service_type_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
