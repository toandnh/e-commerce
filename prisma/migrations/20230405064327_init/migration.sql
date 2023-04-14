/*
  Warnings:

  - You are about to drop the `ItemTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemTag" DROP CONSTRAINT "ItemTag_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemTag" DROP CONSTRAINT "ItemTag_tagId_fkey";

-- DropTable
DROP TABLE "ItemTag";

-- CreateTable
CREATE TABLE "ItemsTags" (
    "itemId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ItemsTags_pkey" PRIMARY KEY ("itemId","tagId")
);

-- AddForeignKey
ALTER TABLE "ItemsTags" ADD CONSTRAINT "ItemsTags_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsTags" ADD CONSTRAINT "ItemsTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
