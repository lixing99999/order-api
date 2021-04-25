import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import * as Entities from './entities';
export const initDb = async () => {
  const entities = [];

  Object.keys(Entities).forEach((entity) => {
    entities.push(Entities[entity]);
  });

  const conn = await createConnection({
    type: 'mysql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '999999',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'setel-assessment',
    entities,
    synchronize: true,
  });

  return conn;
};
