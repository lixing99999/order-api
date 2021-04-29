import { Server, ResponseToolkit } from '@hapi/hapi';
const _ = require('lodash');
const Hapi = require('@hapi/hapi');
const colors = require('colors');

const init = async () => {
  // eslint-disable-next-line
  console.log(colors.yellow('STARTING SERVER. PLEASE WAIT...'));

  const server: Server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.YOUR_HOST || '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'
      },
    },
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
