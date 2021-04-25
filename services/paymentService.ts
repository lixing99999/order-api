import { Orders } from '../db/entities/Orders';
import axios from '../utils/axios';

export default class PaymentService {
  constructor() {}
  public async createPayment(userId: number, orderId: number) {
    const payment = await axios.post('payment', { user_id: userId, order_id: orderId });
    return payment;
  }
}
