import { createOrder } from '../controllers/orderController';
import Joi = require('joi');

const orderRoutes = [
  {
    method: 'GET',
    path: '/order',
    handler: createOrder,
  },
];

module.exports = orderRoutes;
