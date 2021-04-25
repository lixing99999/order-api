import { OrderItemRequest } from '../interface/orderItemRequest';
const _ = require('lodash');

export default class OrderItemService {
  constructor() {}
  public calculateTotalAmount(items: OrderItemRequest[]) {
    return _.sumBy(items, 'amount');
  }
}
