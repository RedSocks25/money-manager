import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { httpStatus } from "@/constants/httpStatus";


interface Segments {
  params: {
    id: string;
  };
}


/**
 * Handles GET requests to fetch a specific transaction by its ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segments} segments - An object containing route parameters.
 * @param {string} segments.params.id - The ID of the transaction to fetch.
 * @returns {Promise<NextResponse>} - A response containing the transaction data or an error message.
 */
export async function GET(request: Request, { params }: Segments) {

  const { id } = params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(transaction, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles PUT requests to update an existing transaction by its ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segments} segments - An object containing route parameters.
 * @param {string} segments.params.id - The ID of the transaction to update.
 * @returns {Promise<NextResponse>} - A response containing the updated transaction data or an error message.
 */
export async function PUT(request: Request, { params }: Segments) {

  const { id } = params;
  const { date, amount, accountId, categoryId, transactionTypeId, note, description } = await request.json();

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        amount,
        note,
        date: new Date(date),
        accountId,
        categoryId,
        transactionTypeId,
        description,
      },
    });

    return NextResponse.json(updatedTransaction, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles DELETE requests to remove a transaction by its ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segments} segments - An object containing route parameters.
 * @param {string} segments.params.id - The ID of the transaction to delete.
 * @returns {Promise<NextResponse>} - A response with a success message if the deletion is successful, or an error message.
 */
export async function DELETE(request: Request, { params }: Segments) {
  
    const { id } = params;
  
    try {
      await prisma.transaction.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({ message: "Transaction deleted successfully." }, { status: httpStatus.OK });
    } catch (error) {
      return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
    }
  }