/*
  Warnings:

  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "OrderItem" (
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "orderId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_title_key" ON "OrderItem"("title");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
