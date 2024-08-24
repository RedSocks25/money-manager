import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { httpStatus } from "@/constants/httpStatus";
import { accountSchema } from "@/validations/account";


/**
 * Handles GET requests to fetch all accounts along with their transactions.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the accounts and their transactions or an error message.
 */
export async function GET(request: Request) {

  try {
    const accounts = await prisma.account.findMany({
      include: {
        transactions: true,
      },
    });
    return NextResponse.json(accounts, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles POST requests to create a new account.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the newly created account or an error message.
 */
export async function POST(request: Request) {
  
  try {
    const {
      name,
      description,
      balance,
      userId,
      accountTypeId,
      currencyId,
    } = await accountSchema.validate(await request.json());

    const newAccount = await prisma.account.create({
      data: {
        name,
        description,
        balance,
        userId,
        accountTypeId,
        currencyId
      }
    });

    return NextResponse.json(newAccount, { status: httpStatus.CREATED });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}