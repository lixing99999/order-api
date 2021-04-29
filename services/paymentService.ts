import { Payments } from '../db/entities';
import axios from '../utils/axios';

export default class PaymentService {
  constructor() {}
  public async createPayment(userId: number, orderId: number) {
    const payment = await axios.post('payment', { user_id: userId, order_id: orderId });
    return payment;
  }

  public async updatePayment(userId: number, orderId: number) {
    const payment = await axios.put(`payment/${orderId}`, { status: Payments.TRANSACTION_RETURNED });
    return payment;
  }
}
