-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "transactionTypeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
