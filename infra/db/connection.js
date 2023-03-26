import knex from 'knex';
import {rootLogger} from "../logging/root-logger.js";

const logger = rootLogger.child(
  { component: 'knex' },
  true
);

const config = {
  debug: true,
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
    debug: logger.debug,
    warn: logger.warn,
    error: logger.error
  }
};

export default config;

export const db = knex(config);
