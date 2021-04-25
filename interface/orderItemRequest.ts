import { array, number, string } from 'joi';
const Joi = require('joi');

export interface OrderItemRequest {
  name: string;
  amount: number;
}
