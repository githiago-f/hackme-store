import {db} from "../infra/db/connection.js";
import {rootLogger} from "../infra/logging/root-logger.js";

const logger = rootLogger.child({ component: 'get-count' }, true);

/**
 * The sql statement should return "total" as
 * it's only field.
 * @param sql
 * @returns {Promise<number>}
 */
export const getCount = async (sql) => {
  try {
    return (await db.raw(sql))[0][0]['total'];
  } catch(e) { logger.error(e); }
  return 0;
}
