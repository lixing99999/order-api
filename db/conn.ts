import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import * as Entities from './entities';
export const initDb = () => {
  const entities = [];

  Object.keys(Entities).forEach((entity) => {
    entities.push(Entities[entity]);
  });

  createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '999999',
    database: 'setel-assessment',
    entities: entities,
    synchronize: true,
  })
    .then((connection) => {
      // here you can start to work with your entities
    })
    .catch((error) => console.log(error));
};
