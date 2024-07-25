/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cellName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discipuladorNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `obreiroNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NetworkDiscipulador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NetworkObreiro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkDiscipulador" DROP CONSTRAINT "NetworkDiscipulador_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkDiscipulador" DROP CONSTRAINT "NetworkDiscipulador_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkObreiro" DROP CONSTRAINT "NetworkObreiro_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkObreiro" DROP CONSTRAINT "NetworkObreiro_pastorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_cellId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_pastorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "cellName",
DROP COLUMN "discipuladorNetwork",
DROP COLUMN "obreiroNetwork",
DROP COLUMN "phone",
DROP COLUMN "photo",
DROP COLUMN "role";

-- DropTable
DROP TABLE "Cell";

-- DropTable
DROP TABLE "NetworkDiscipulador";

-- DropTable
DROP TABLE "NetworkObreiro";

-- DropTable
DROP TABLE "Report";
