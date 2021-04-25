import { AuthCredentials } from '@hapi/hapi';
import { EntityRepository } from 'typeorm';
import { Orders } from '../db/entities';
import BaseRepository from './baseRepository';

@EntityRepository(Orders)
export default class OrderRepository extends BaseRepository<Orders> {
  public async createOrder(order?: Orders, auth?: AuthCredentials) {}
}
