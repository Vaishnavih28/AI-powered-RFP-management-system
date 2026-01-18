-- CreateTable
CREATE TABLE `Vendors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vendors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sentrpf` (
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
ALTER TABLE `sentrpf` ADD CONSTRAINT `sentrpf_rfpId_fkey` FOREIGN KEY (`rfpId`) REFERENCES `RFP`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sentrpf` ADD CONSTRAINT `sentrpf_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
