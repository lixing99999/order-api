import { EntityRepository } from 'typeorm';
import { OrderItems, Orders } from '../db/entities';
import { OrderItemRequest } from '../interface/orderItemRequest';
import BaseRepository from './baseRepository';

const _ = require('lodash');

@EntityRepository(OrderItems)
export default class OrderItemsRepository extends BaseRepository<Orders> {
  public async createOrderItems(userId: number, orderId: number, items: OrderItemRequest[]) {
    const orderItems = _.map(items, (x) => {
      return Object.assign(x, { order_id: orderId });
    });

    await this.save(userId, orderItems);
  }
}
