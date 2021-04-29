import { Payments } from '../db/entities';
import axios from '../utils/axios';

export default class PaymentService {
  constructor() {}
  public async createPayment(userId: number, orderId: number) {
    const payment = await axios.post('payment', { user_id: userId, order_id: orderId, status: Payments.STATUS_CONFIRMED });
    return payment;
  }

  public async updatePayment(paymentId: number, userId: number, orderId: number) {
    const payment = await axios.put(`payment/${paymentId}`, { status: Payments.STATUS_CANCELLED });
    return payment;
  }
}
