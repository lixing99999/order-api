import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import * as Entities from '../db/entities';
const colors = require('colors');
const fs = require('fs');

let connection;

beforeEach(async function () {
  console.log(colors.yellow('STARTING SERVER. PLEASE WAIT...'));
  const entities = [];
  Object.keys(Entities).forEach((entity) => {
    entities.push(Entities[entity]);
  });
  connection = await createConnection({
    type: 'mysql',
    username: 'root',
    password: '999999',
    host: 'localhost',
    database: 'setel-assessment',
    entities,
  });
  console.log(colors.rainbow('SERVER IS READY NOW!!!'));
});

afterEach(async function () {
  await connection.close();
  console.log(colors.red('CONNECTION CLOSED'));
});
