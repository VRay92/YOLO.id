-- /*
--   Warnings:

--   - You are about to drop the column `locationId` on the `events` table. All the data in the column will be lost.
--   - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
--   - Added the required column `cityId` to the `events` table without a default value. This is not possible if the table is not empty.
--   - Added the required column `location` to the `events` table without a default value. This is not possible if the table is not empty.

-- */
-- -- DropForeignKey

-- -- AlterTable


-- -- AlterTable
-- ALTER TABLE `users` ADD COLUMN `contactNumber` VARCHAR(191) NULL,
--     ADD COLUMN `imageProfile` VARCHAR(191) NULL;

-- -- DropTable

-- -- CreateTable
-- CREATE TABLE `cities` (
--     `id` INTEGER NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR(191) NOT NULL,

--     PRIMARY KEY (`id`)
-- ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -- AddForeignKey
-- ALTER TABLE `events` ADD CONSTRAINT `events_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
