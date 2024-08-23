import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { categorySchema } from "@/validations/categoryValidations";
import { httpStatus } from "@/constants/httpStatus";


interface Segment {
  params: {
    id: string;
  };
}

/**
 * Handles GET requests to fetch a single category by ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} { params } - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing the category or an error message.
 */
export async function GET(request: Request, { params }: Segment) {
  try {

    console.log(params.id)

    const category = await prisma.category.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(category, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}


/**
 * Handles PUT requests to update a category by ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} { params } - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing the updated category or an error message.
 */
export async function PUT(request:Request, { params }: Segment) {
  try {
    const {
      name,
      transactionTypeId,
      parentId,
    } = await categorySchema.validate(await request.json());

    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name,
        transactionTypeId,
        parentId,
      },
    });

    return NextResponse.json(updatedCategory, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.BAD_REQUEST });
  }
}


/**
 * Handles DELETE requests to delete a category by ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Segment} { params } - The URL parameters.
 * @returns {Promise<NextResponse>} - A response containing the deleted category or an error message.
 */
export async function DELETE(request: Request, { params }: Segment) {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(deletedCategory, { status: httpStatus.OK });
  } catch (error) {
    return NextResponse.json(error, { status: httpStatus.INTERNAL_SERVER_ERROR });
  }
}