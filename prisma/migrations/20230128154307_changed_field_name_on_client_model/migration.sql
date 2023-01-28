/*
  Warnings:

  - You are about to drop the column `budgetDescrpiton` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `budgetDescrpiton`,
    ADD COLUMN `budgetDescription` VARCHAR(191) NULL;
