import { Server, ResponseToolkit } from '@hapi/hapi';
import { initDb } from './db/conn';
const _ = require('lodash');
const Hapi = require('@hapi/hapi');
const colors = require('colors');

const init = async () => {
  // eslint-disable-next-line
  console.log(colors.yellow('STARTING SERVER. PLEASE WAIT...'));

  const server: Server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '127.0.0.1',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'
      },
    },
    debug: process.env.NODE_ENV !== 'production' ? { request: ['*'] } : false,
  });

  // mysql
  await initDb();

  // // routes
  const routes = require('./routes');
  server.route(routes);

  // start server
  server.start();

  // eslint-disable-next-line
  console.log(colors.rainbow('SERVER IS READY NOW!!!'));
};

init();
