import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { httpStatus } from "@/constants/httpStatus";
import { accountSchema } from "@/validations/account";


interface Segment {
  params: {
    id: string;
  };
}

/**
 * Handles GET requests to fetch a single account by its ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} params - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing the account or an error message.
 */
export async function GET(request: Request, { params }: Segment) {

  try {
    const account = await prisma.account.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(account, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles PUT requests to update an existing account.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} params - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing the updated account or an error message.
 */
export async function PUT(request: Request, { params }: Segment) {

  try {
    const {
      name,
      description,
      balance,
      userId,
      accountTypeId,
      currencyId,
    } = await accountSchema.validate(await request.json());

    const updatedAccount = await prisma.account.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        description,
        balance,
        userId,
        accountTypeId,
        currencyId,
      },
    });

    return NextResponse.json(updatedAccount, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles DELETE requests to remove an existing account.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} params - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing a success message or an error message.
 */
export async function DELETE(request: Request, { params }: Segment) {

  try {
    await prisma.account.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({ message: "Account deleted successfully." }, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}