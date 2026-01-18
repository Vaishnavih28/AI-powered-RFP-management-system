-- AlterTable
ALTER TABLE `rfp` MODIFY `budget` DOUBLE NULL,
    MODIFY `paymentTerms` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `rfpitem` MODIFY `quantity` INTEGER NULL,
    MODIFY `category` VARCHAR(191) NULL;
