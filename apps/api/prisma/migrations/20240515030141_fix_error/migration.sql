/*
  Warnings:

  - A unique constraint covering the columns `[userVoucherId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userPointId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `user_points` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `user_vouchers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userPointId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userVoucherId_fkey`;

-- AlterTable
ALTER TABLE `user_points` ADD COLUMN `transactionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user_vouchers` ADD COLUMN `transactionId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_userVoucherId_key` ON `transactions`(`userVoucherId`);

-- CreateIndex
CREATE UNIQUE INDEX `transactions_userPointId_key` ON `transactions`(`userPointId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_points_transactionId_key` ON `user_points`(`transactionId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_vouchers_transactionId_key` ON `user_vouchers`(`transactionId`);

-- AddForeignKey
ALTER TABLE `user_points` ADD CONSTRAINT `user_points_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vouchers` ADD CONSTRAINT `user_vouchers_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
