import knex from 'knex';

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.IS_DOCKER === 'yes' ? 'sales_db' : 'localhost',
    database: 'mary_store',
    password: 'password',
    user: 'user',
    port: 3306
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
