import * as yup from 'yup';

const baseSchema = yup.object({
  amount:             yup.number().required(),
  accountId:          yup.number().required(),
  categoryId:         yup.number().required(),
  transactionTypeId:  yup.number().required(),
  note:               yup.string().optional().nullable(),
  description:        yup.string().optional().nullable(),
});

/**
 * Schema for creating a new transaction.
 * 
 * In this case the date can be null or undefined. Since is a new transaction we assume could be the current date
 * or the date given by the user
 */
export const createTransactionSchema = baseSchema.concat(
  yup.object({
    date: yup.date().optional(),
  })
);

/**
 * Extends from transactionSChema but requires the date field.
 * 
 * Since the transaction exists, we cannot give a null value for the date field.
 */
export const updateTransactionSchema = baseSchema.concat(
  yup.object({
    date: yup.date().required(),
  })
);

