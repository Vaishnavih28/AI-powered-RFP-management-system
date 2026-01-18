/*
  Warnings:

  - You are about to alter the column `deliveryDays` on the `proposal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `proposal` MODIFY `deliveryDays` INTEGER NULL;
