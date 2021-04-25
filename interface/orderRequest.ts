import { OrderItemRequest } from './orderItemRequest';

export interface orderRequest {
  status: number;
  items: OrderItemRequest[];
}
