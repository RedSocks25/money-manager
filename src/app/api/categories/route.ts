import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { httpStatus } from "@/constants/httpStatus";
import { categorySchema } from "@/validations/category";


/**
 * Handles GET requests to fetch all categories.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the list of categories or an error message.
 */
export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles POST requests to create a new category.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A response containing the created category or an error message.
 */
export async function POST(request: Request) {

  try {
    const {
      name,
      transactionTypeId,
      parentId,
    } = await categorySchema.validate(await request.json());

    const newCategory = await prisma.category.create({
      data: {
        name,
        transactionTypeId,
        parentId,
      },
    });


    return NextResponse.json(newCategory, { status: httpStatus.OK });
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: httpStatus.BAD_REQUEST });
  }
}
