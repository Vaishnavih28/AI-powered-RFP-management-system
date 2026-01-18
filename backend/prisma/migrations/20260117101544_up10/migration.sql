/*
  Warnings:

  - You are about to drop the column `notes` on the `proposal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `proposal` DROP COLUMN `notes`,
    ADD COLUMN `parsedJson` JSON NULL;
