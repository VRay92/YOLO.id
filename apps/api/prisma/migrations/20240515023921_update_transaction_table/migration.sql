-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `userPointId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userPointId_fkey` FOREIGN KEY (`userPointId`) REFERENCES `user_points`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
