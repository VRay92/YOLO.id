/*
  Warnings:

  - You are about to drop the column `userPointId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `userVoucherId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `user_points` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `user_vouchers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_points` DROP FOREIGN KEY `user_points_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `user_vouchers` DROP FOREIGN KEY `user_vouchers_transactionId_fkey`;

-- DropIndex
DROP INDEX `transactions_userPointId_key` ON `transactions`;

-- DropIndex
DROP INDEX `transactions_userVoucherId_key` ON `transactions`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `userPointId`,
    DROP COLUMN `userVoucherId`;

-- AlterTable
ALTER TABLE `user_points` DROP COLUMN `transactionId`,
    ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user_vouchers` DROP COLUMN `transactionId`,
    ADD COLUMN `isUsed` BOOLEAN NOT NULL DEFAULT false;
