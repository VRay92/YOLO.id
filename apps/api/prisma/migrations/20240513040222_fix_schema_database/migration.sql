/*
  Warnings:

  - You are about to drop the `_CategoryToEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToEvent` DROP FOREIGN KEY `_CategoryToEvent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToEvent` DROP FOREIGN KEY `_CategoryToEvent_B_fkey`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_CategoryToEvent`;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
