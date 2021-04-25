import { EntityRepository } from 'typeorm';
import { Orders } from '../db/entities/Orders';
import BaseRepository from './baseRepository';

@EntityRepository(Orders)
export default class OrderRepository extends BaseRepository<Orders> {}
