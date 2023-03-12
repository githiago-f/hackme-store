import knex from 'knex';

const config = {
  client: 'mysql2',
  connection: {
    database: 'mary_store',
    password: 'password',
    user: 'user'
  },
  migrations: {
    directory: './migrations'
  },
  seeds: {
    directory: './seeds/dev'
  },
  log: {
    enableColors: true,
    inspectionDepth: 3,
    debug: console.debug,
    warn: console.warn,
    error: console.error
  }
};

export default config;

export const db = knex(config);
