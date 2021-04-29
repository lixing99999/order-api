import { Server, ResponseToolkit } from '@hapi/hapi';
const _ = require('lodash');
const Hapi = require('@hapi/hapi');
const colors = require('colors');

const init = async () => {
  // eslint-disable-next-line
  console.log(colors.yellow('STARTING SERVER. PLEASE WAIT...'));

  const server: Server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '127.0.0.1',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'
      },
    },
    debug: process.env.NODE_ENV !== 'production' ? { request: ['*'] } : false,
  });

  server.route({
    method: 'GET',
    path: '/test',
    handler: () => {
      return 'hello';
    },
  });

  // start server
  server.start();

  // eslint-disable-next-line
  console.log(colors.rainbow('SERVER IS READY NOW!!!'));
};

init();
