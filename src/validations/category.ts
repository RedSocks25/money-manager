import * as yup from 'yup';


export const categorySchema = yup.object({
  name:               yup.string().required(),
  transactionTypeId:  yup.number().required(),
  parentId:           yup.number().optional().nullable(),
});
