/*
  Warnings:

  - Added the required column `fileNames` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `fileNames` VARCHAR(191) NOT NULL;
