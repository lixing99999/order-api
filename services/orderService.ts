import { getConnection } from 'typeorm';
import OrderItemsRepository from '../repositories/orderItemRepository';
import OrderRepository from '../repositories/orderRepository';
import OrderItemService from './orderItemService';
import * as Boom from '@hapi/boom';
import { Orders } from '../db/entities';
import PaymentService from './paymentService';
import { orderRequest } from '../interface/orderRequest';
const _ = require('lodash');

const orderItemService = new OrderItemService();
const paymentService = new PaymentService();

export default class OrderService {
  public async createOrder(userId: number, request: orderRequest) {
    const queryRunner = getConnection().createQueryRunner();
    const orderRepo = queryRunner.manager.getCustomRepository(OrderRepository);
    const orderItemRepo = queryRunner.manager.getCustomRepository(OrderItemsRepository);
    let order;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const total = await orderItemService.calculateTotalAmount(_.get(request, 'items'));

      order = await orderRepo.save(userId, <Orders>{
        total: total,
        status: request?.status ?? Orders.STATUS_PENDING,
      });

      await orderItemRepo.createOrderItems(userId, order.id, _.get(request, 'items'));

      if (order.status == Orders.STATUS_CONFIRMED) {
        const payment = await paymentService.createPayment(userId, order.id);

        if (payment?.status == 200) {
          setTimeout(async () => {
            await this.updateOrder(userId, order.id, Orders.STATUS_DELIVERED);
            console.log('delivered');
          }, 60000);
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw Boom.badData('Transaction is not success.');
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
        const payment = await paymentService.createPayment(userId, orderId);
        if (payment?.status == 200) {
          setTimeout(async () => {
            await this.updateOrder(userId, orderId, Orders.STATUS_DELIVERED);
            console.log('delivered');
          }, 60000);
        }
      }

      if (status == Orders.STATUS_CANCEL) {
        const payment = await paymentService.updatePayment(userId, orderId);
        if (payment?.status == 200) {
          setTimeout(async () => {
            await this.updateOrder(userId, orderId, Orders.STATUS_DELIVERED);
            console.log('delivered');
          }, 60000);
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw Boom.badData('Transaction is not success.');
    } finally {
      await queryRunner.release();
    }
  }
}
