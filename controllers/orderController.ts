import { ResponseObject, Request, ResponseToolkit } from '@hapi/hapi';
import { getCustomRepository } from 'typeorm';
import OrderRepository from '../repositories/orderRepository';
import OrderService from '../services/orderService';
import { user } from '../assets/constants';
import { orderRequest } from '../interface/orderRequest';

const _ = require('lodash');

const orderService = new OrderService();
const orderRepo = getCustomRepository(OrderRepository);

export const createOrder = async ({ payload, auth }: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  const order = await orderService.createOrder(user.id, <orderRequest>payload);
  return h.response(order).code(200);
};

export const updateOrder = async ({ payload, auth, params }: Request, h: ResponseToolkit): Promise<ResponseObject> => {
  await orderService.updateOrder(user.id, _.get(params, 'id'), _.get(payload, 'status'));
  const order = await orderRepo.findOne(1, _.get(params, 'id'));
  return h.response(order).code(200);
};
