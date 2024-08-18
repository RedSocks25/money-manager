import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {
    // Step 1: Delete existing data
    await prisma.transaction.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.transactionType.deleteMany({});
    await prisma.accountType.deleteMany({});
    await prisma.currency.deleteMany({});


    // Step 2: Create a user
    const user = await prisma.user.create({
      data: {
        name: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'securepassword',
      },
    });

    // Step 3: Ensure account types and currencies exist
    const bankAccountType = await prisma.accountType.upsert({
      where: { type: 'Bank Account' },
      update: {},
      create: { type: 'Bank Account' },
    });

    const savingsAccountType = await prisma.accountType.upsert({
      where: { type: 'Savings Account' },
      update: {},
      create: { type: 'Savings Account' },
    });

    const clpCurrency = await prisma.currency.upsert({
      where: { code: 'CLP' },
      update: {},
      create: { code: 'CLP', name: 'Chilean Peso' },
    });

    const usdCurrency = await prisma.currency.upsert({
      where: { code: 'USD' },
      update: {},
      create: { code: 'USD', name: 'US Dollar' },
    });

    // Step 4: Create accounts for the user
    const bankAccount = await prisma.account.create({
      data: {
        name: 'Bank Account',
        description: 'Primary bank account',
        balance: 1000.0,
        userId: user.id,
        accountTypeId: bankAccountType.id,
        currencyId: clpCurrency.id,
      },
    });

    const savingsAccount = await prisma.account.create({
      data: {
        name: 'Savings Account',
        description: 'Savings account',
        balance: 2000.0,
        userId: user.id,
        accountTypeId: savingsAccountType.id,
        currencyId: usdCurrency.id,
      },
    });

    // Step 5: Ensure transaction types and categories exist
    const incomeType = await prisma.transactionType.upsert({
      where: { type: 'Income' },
      update: {},
      create: { type: 'Income' },
    });

    const outcomeType = await prisma.transactionType.upsert({
      where: { type: 'Outcome' },
      update: {},
      create: { type: 'Outcome' },
    });

    const salaryCategory = await prisma.category.create({
      data: {
        name: 'Salary',
        transactionTypeId: incomeType.id,
      },
    });

    const foodCategory = await prisma.category.create({
      data: {
        name: 'Food',
        transactionTypeId: outcomeType.id,
      },
    });

    const tradingWithdrawalCategory = await prisma.category.create({
      data: {
        name: 'Trading Withdrawal',
        transactionTypeId: incomeType.id,
      },
    });

    const educationCategory = await prisma.category.create({
      data: {
        name: 'Education',
        transactionTypeId: outcomeType.id,
      },
    });

    // Step 6: Create transactions for each account
    await prisma.transaction.createMany({
      data: [
        {
          amount: 500.0,
          date: new Date(),
          note: 'Salary for January',
          description: 'Monthly salary',
          accountId: bankAccount.id,
          transactionTypeId: incomeType.id,
          categoryId: salaryCategory.id,
        },
        {
          amount: -200.0,
          date: new Date(),
          note: 'Grocery shopping',
          description: 'Weekly groceries',
          accountId: bankAccount.id,
          transactionTypeId: outcomeType.id,
          categoryId: foodCategory.id,
        },
        {
          amount: 1000.0,
          date: new Date(),
          note: 'Trading profit',
          description: 'Profit from trading',
          accountId: savingsAccount.id,
          transactionTypeId: incomeType.id,
          categoryId: tradingWithdrawalCategory.id,
        },
        {
          amount: -300.0,
          date: new Date(),
          note: 'Online course',
          description: 'Payment for online course',
          accountId: savingsAccount.id,
          transactionTypeId: outcomeType.id,
          categoryId: educationCategory.id,
        },
      ],
    });

    return NextResponse.json({ message: 'Data seeded successfully' });
  } catch (error) {
    // Handle the error here
    console.error(error);
    return NextResponse.json({ message: 'Error seeding data' }, { status: 500 });
  }
}