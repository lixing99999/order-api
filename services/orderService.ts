import { getConnection } from 'typeorm';
import { OrderItemRequest } from '../interface/orderItemRequest';
import OrderItemsRepository from '../repositories/orderItemRepository';
import OrderRepository from '../repositories/orderRepository';
import OrderItemService from './orderItemService';
import * as Boom from '@hapi/boom';
import { Orders } from '../db/entities';

const orderItemService = new OrderItemService();

export default class OrderService {
  constructor() {}
  public async createOrder(userId: number, items: OrderItemRequest[]) {
    const queryRunner = getConnection().createQueryRunner();
    const orderRepo = queryRunner.manager.getCustomRepository(OrderRepository);
    const orderItemRepo = queryRunner.manager.getCustomRepository(OrderItemsRepository);
    let order;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const total = orderItemService.calculateTotalAmount(items);
      console.log(total);
      order = await orderRepo.save(userId, <Orders>{
        total: total,
        status: Orders.STATUS_PENDING,
      });

      await orderItemRepo.createOrderItems(userId, order.id, items);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw Boom.badData('Transaction is not successss.');
    } finally {
      await queryRunner.release();
    }
    return order;
  }

  public async updateOrder(userId: number, orderId: number, status: number) {
    const queryRunner = getConnection().createQueryRunner();
    const orderRepo = queryRunner.manager.getCustomRepository(OrderRepository);
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await orderRepo.update(orderId, { status: status });

      if (status == Orders.STATUS_CONFIRMED) {
        await this.confirmOrder(userId, orderId);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw Boom.badData('Transaction is not success.');
    } finally {
      await queryRunner.release();
    }
  }

  public async confirmOrder(userId: number, orderId) {
    // call payment endpoint
    // after 5 minutes the order will automatically move to deliver state
  }
}
