-- CreateTable
CREATE TABLE `Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfpId` INTEGER NOT NULL,
    `emailId` INTEGER NOT NULL,
    `vendorId` INTEGER NOT NULL,
    `rawtext` TEXT NOT NULL,
    `totalBudget` INTEGER NULL,
    `deliveryDays` VARCHAR(191) NULL,
    `warranty` VARCHAR(191) NULL,
    `paymentTerms` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
