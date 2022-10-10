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
  const [result] = await mysql.pool().query<ResultSetHeader>(
    `INSERT INTO ck_test (name, email, password) VALUES 
    (:name, :email, :password)`,
    user
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

  switch (data.case) {
    case eSELECT_USER.BY_ID:
      sql = `SELECT ${col} FROM ck_test WHERE id = :id`;
      break;

    case eSELECT_USER.BY_EMAIL:
      sql = `SELECT ${col} FROM ck_test WHERE email = :email`;
      break;

    case eSELECT_USER.BY_NAME_EMAIL:
      sql = `SELECT ${col} FROM ck_test WHERE name = :name AND email = :email`;
      break;

    default:
      return null;
  }

  const [result] = await mysql.pool().query<TUser[]>(sql, data);

  return result[0];
}

// **** Export default **** //

export default {
  createUser,
  userDetail,
} as const;
