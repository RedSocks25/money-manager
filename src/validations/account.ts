import * as yup from 'yup';


export const accountSchema = yup.object({
  name:           yup.string().required(),
  description:    yup.string().optional(),
  balance:        yup.number().required(),
  userId:         yup.number().required(),
  accountTypeId:  yup.number().required(),
  currencyId:     yup.number().required(),
});
