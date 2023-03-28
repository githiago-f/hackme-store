import { createLogger } from 'bunyan';

/**
 * Avoid using console.log, this is mutch better:
 * It will show some important things to the output stream
 */
export const rootLogger = createLogger({
  name: 'sql-injection-store'
});
