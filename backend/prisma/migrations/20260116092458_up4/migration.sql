-- AlterTable
ALTER TABLE `rfp` MODIFY `deliveryDays` VARCHAR(191) NULL,
    MODIFY `warranty` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `rfpitem` MODIFY `specs` VARCHAR(191) NULL;
