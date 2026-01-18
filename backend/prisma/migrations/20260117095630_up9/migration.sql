/*
  Warnings:

  - You are about to drop the column `rawtext` on the `proposal` table. All the data in the column will be lost.
  - Added the required column `rawText` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proposal` DROP COLUMN `rawtext`,
    ADD COLUMN `rawText` TEXT NOT NULL;
