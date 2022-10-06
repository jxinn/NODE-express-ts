import * as mysql from "mysql2/promise";
import envVars from "@shared/env-vars";

// **** Variables **** //

const createPool = mysql.createPool({
  host: envVars.mysql.host,
  port: envVars.mysql.port,
  database: envVars.mysql.database,
  user: envVars.mysql.user,
  password: envVars.mysql.password,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
  namedPlaceholders: true,
});

// **** Functions **** //

/**
 * return pool.
 */
function pool(): mysql.Pool {
  return createPool;
}

// **** Export default **** //

export default {
  pool,
} as const;
