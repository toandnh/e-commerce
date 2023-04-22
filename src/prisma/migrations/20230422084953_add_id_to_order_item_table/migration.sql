-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");
