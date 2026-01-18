/*
  Warnings:

  - You are about to drop the column `warrantyYears` on the `rfp` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `rfpitem` table. All the data in the column will be lost.
  - Added the required column `warranty` to the `RFP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `RFPItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rfp` DROP COLUMN `warrantyYears`,
    ADD COLUMN `warranty` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rfpitem` DROP COLUMN `type`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
