/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
