/*
  Warnings:

  - You are about to drop the column `parsedJson` on the `proposal` table. All the data in the column will be lost.
  - Added the required column `notes` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proposal` DROP COLUMN `parsedJson`,
    ADD COLUMN `notes` VARCHAR(191) NOT NULL;
