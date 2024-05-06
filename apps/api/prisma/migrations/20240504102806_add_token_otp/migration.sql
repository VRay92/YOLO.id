-- AlterTable
ALTER TABLE `users` ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `verificationToken` VARCHAR(191) NULL;
