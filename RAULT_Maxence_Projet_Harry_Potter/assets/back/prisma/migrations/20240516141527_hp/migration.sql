/*
  Warnings:

  - You are about to drop the `_usercards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_usercards` DROP FOREIGN KEY `_UserCards_A_fkey`;

-- DropForeignKey
ALTER TABLE `_usercards` DROP FOREIGN KEY `_UserCards_B_fkey`;

-- AlterTable
ALTER TABLE `card` ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_usercards`;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
