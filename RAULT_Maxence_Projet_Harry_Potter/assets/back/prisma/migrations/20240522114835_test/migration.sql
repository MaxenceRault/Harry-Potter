/*
  Warnings:

  - Added the required column `alt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` ADD COLUMN `alt` VARCHAR(191) NOT NULL,
    ADD COLUMN `house` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
