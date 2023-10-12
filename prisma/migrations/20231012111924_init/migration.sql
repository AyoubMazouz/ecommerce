/*
  Warnings:

  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileNames` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductVariant` DROP FOREIGN KEY `ProductVariant_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `discount` INTEGER NULL DEFAULT 0,
    ADD COLUMN `fileNames` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `variantId` INTEGER NULL,
    MODIFY `published` BOOLEAN NULL DEFAULT false;

-- DropTable
DROP TABLE `ProductVariant`;
