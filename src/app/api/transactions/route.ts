import { httpStatus } from "@/constants/httpStatus";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


/**
 * Handles GET requests to fetch all transactions.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the list of transactions or an error message.
 */
export async function GET(request: Request) {
  try {
    const transactions = await prisma.transaction.findMany();

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

  const { date, amount, accountId, categoryId, transactionTypeId, note} = await request.json();

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        note,
        date: new Date(date),
        accountId,
        categoryId,
        transactionTypeId,
      },
    });

    return NextResponse.json(newTransaction, { status: httpStatus.CREATED });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}