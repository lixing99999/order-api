import { createOrder, updateOrder } from '../controllers/orderController';
import Joi = require('joi');

const orderRoutes = [
  {
    method: 'POST',
    path: '/order',
    handler: createOrder,
  },
  {
    method: 'PUT',
    path: '/order/{id}',
    handler: updateOrder,
  },
];

module.exports = orderRoutes;
