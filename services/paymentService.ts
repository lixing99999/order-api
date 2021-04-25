import { OrderItemRequest } from '../interface/orderItemRequest';

export default class PaymentService {
  constructor() {}
  public async confirmPayment(userId: number, items: OrderItemRequest[]) {}
}
