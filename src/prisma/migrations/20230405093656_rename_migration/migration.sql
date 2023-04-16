/*
  Warnings:

  - Added the required column `image` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" 
RENAME COLUMN "images" TO "image";
