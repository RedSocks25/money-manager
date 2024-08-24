import { NextResponse } from "next/server";
import { URL } from "url";

import { httpStatus } from "@/constants/httpStatus";
import { TransactionParams } from "@/interfaces/queryParams";
import prisma from "@/lib/prisma";
import { createTransactionSchema } from "@/validations/transaction";


/**
 * Handles GET requests to get transactions by category, by account or all transactions.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the transactions or an error message.
 */
export async function GET(request: Request) {

  // Parse the query string to get the categoryId.
  const url = new URL(request.url);
  const { category, account } = Object.fromEntries(url.searchParams.entries()) as TransactionParams;


  try {
    // If the categoryId is provided get transactions by category, or get all transactions.
    const transactions = await prisma.transaction.findMany({
      where: {
        categoryId: (!!category) ? parseInt(category) : undefined,
        accountId: (!!account) ? parseInt(account) : undefined,
      },
    });

    return NextResponse.json(transactions, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles POST requests to create a new transaction.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the created transaction or an error message.
 */
export async function POST(request: Request) {

  try {
    const {
      date,
      amount,
      accountId,
      categoryId,
      transactionTypeId,
      note,
      description,
    } = await createTransactionSchema.validate(await request.json());

    const newTransaction = await prisma.transaction.create({
      data: {
        date: date || new Date(Date.now()),
        amount,
        accountId,
        categoryId,
        transactionTypeId,
        note,
        description,
      },
    });

    return NextResponse.json(newTransaction, { status: httpStatus.CREATED });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}