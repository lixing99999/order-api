import { expect } from 'chai';
import { getCustomRepository } from 'typeorm';
import { Orders } from '../db/entities';
import OrderRepository from '../repositories/orderRepository';
import OrderService from '../services/orderService';
import { user } from '../assets/constants';

describe('order', () => {
  it('create order', async () => {
    const orderService = new OrderService();
    const items = [
      {
        name: 'Big Mac',
        amount: 10.0,
      },
    ];
    const order = await orderService.createOrder(user.id, items);
    expect(order).to.be.an('object');
    expect(order).to.have.property('id');
  });

  it('confirm order', async () => {
    const orderService = new OrderService();
    const orderRepo = getCustomRepository(OrderRepository);
    await orderService.updateOrder(user.id, 23, Orders.STATUS_CONFIRMED);
    const order = await orderRepo.findOne(user.id, 23);
    expect(order).to.be.an('object');
    expect(order).to.have.property('id');
    expect({ status: order?.status }).to.deep.equal({ status: Orders.STATUS_CONFIRMED });
  });
});
