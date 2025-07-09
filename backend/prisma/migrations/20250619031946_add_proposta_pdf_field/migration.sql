/*
  Warnings:

  - You are about to drop the column `orientacao` on the `salas` table. All the data in the column will be lost.
  - You are about to drop the column `proposta` on the `salas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "salas" DROP COLUMN "orientacao",
DROP COLUMN "proposta",
ADD COLUMN     "proposta_pdf" TEXT;
