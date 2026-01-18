/*
  Warnings:

  - You are about to drop the `sentrpf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sentrpf` DROP FOREIGN KEY `sentrpf_rfpId_fkey`;

-- DropForeignKey
ALTER TABLE `sentrpf` DROP FOREIGN KEY `sentrpf_vendorId_fkey`;

-- DropTable
DROP TABLE `sentrpf`;

-- CreateTable
CREATE TABLE `email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfpId` INTEGER NOT NULL,
    `vendorId` INTEGER NULL,
    `direction` ENUM('SENT', 'RECEIVED') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `fromEmail` VARCHAR(191) NOT NULL,
    `toEmail` VARCHAR(191) NOT NULL,
    `messageId` VARCHAR(191) NULL,
    `status` ENUM('SENT', 'DELIVERED', 'FAILED', 'RECEIVED') NOT NULL DEFAULT 'SENT',
    `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `email` ADD CONSTRAINT `email_rfpId_fkey` FOREIGN KEY (`rfpId`) REFERENCES `RFP`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `email` ADD CONSTRAINT `email_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
