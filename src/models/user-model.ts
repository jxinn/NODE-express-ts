import {
  eSELECT_USER,
  TCreateUserReq,
  TSelectUserByEmail,
  TSelectUserById,
  TSelectUserByNameEmail,
  TUser,
} from "@shared/types";
import mysql from "@models/mysql";
import { ResultSetHeader } from "mysql2/promise";

// **** Functions **** //

/**
 * Create user.
 */
async function createUser(user: TCreateUserReq): Promise<number> {
  const [result] = await mysql
    .pool()
    .execute<ResultSetHeader>(
      "INSERT INTO `ck_test` (`name`, `email`, `password`) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );

  return result.insertId;
}

/**
 * Select user detail.
 */
/*  */
async function userDetail(
  data: TSelectUserById | TSelectUserByEmail | TSelectUserByNameEmail,
  col = "*"
): Promise<TUser | null> {
  let sql = "";
  let values: any | any[];

  switch (data.case) {
    case eSELECT_USER.BY_ID:
      sql = `SELECT ${col} FROM ck_test WHERE id = ? `;
      values = [data.id];
      break;

    case eSELECT_USER.BY_EMAIL:
      sql = `SELECT ${col} FROM ck_test WHERE email = ? `;
      values = [data.email];
      break;

    case eSELECT_USER.BY_NAME_EMAIL:
      sql = `SELECT ${col} FROM ck_test WHERE name = ? AND email = ?`;
      values = [data.name, data.email];
      break;

    default:
      return null;
  }

  const [result] = await mysql.pool().execute<TUser[]>(sql, values);

  return result[0];
}

// **** Export default **** //

export default {
  createUser,
  userDetail,
} as const;
