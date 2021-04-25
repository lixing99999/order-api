import { array, number, string } from 'joi';

export const orderValidate = {
  status: number(),
  items: array().items({
    name: string(),
    amount: number(),
  }),
};
