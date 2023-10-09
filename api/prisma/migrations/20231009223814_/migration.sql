/*
  Warnings:

  - Added the required column `google` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "google" BOOLEAN NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
