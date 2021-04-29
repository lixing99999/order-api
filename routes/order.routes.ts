import { createOrder, getOrder, updateOrder } from '../controllers/orderController';
import Joi = require('joi');
import { orderValidate } from '../validate/orderValidate';
import { ResponseToolkit } from '@hapi/hapi';

const orderRoutes = [
  {
    method: 'GET',
    path: '/order',
    handler: getOrder,
  },
  {
    method: 'POST',
    path: '/order',
    options: {
      validate: {
        payload: Joi.object(orderValidate),
        failAction: async (_request, _h: ResponseToolkit, err?: Error) => {
          throw err;
        },
      },
    },
    handler: createOrder,
  },
  {
    method: 'PUT',
    path: '/order/{id}',
    options: {
      validate: {
        payload: Joi.object(orderValidate),
        failAction: async (_request, _h: ResponseToolkit, err?: Error) => {
          throw err;
        },
      },
    },
    handler: updateOrder,
  },
];

module.exports = orderRoutes;
