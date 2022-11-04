import mysql from "@models/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// **** Types **** //
export type TUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  created_date: Date;
  updated_date: Date;
} & RowDataPacket;

export type TaddUserParams = {
  email: string;
  password: string;
  name: string;
};

// **** Functions **** //
/**
 * Add one user.
 */
async function insertUser(params: TaddUserParams): Promise<number> {
  const [result] = await mysql.pool().query<ResultSetHeader>(
    `INSERT INTO user (email, password, name) VALUES 
    (:email, :password, :name)`,
    params
  );

  return result.insertId;
}

/**
 * Remove one user.
 */
async function deleteUser(id: number): Promise<boolean> {
  const [result] = await mysql
    .pool()
    .query<ResultSetHeader>(`DELETE FROM user WHERE id = :id`, { id });

  console.log(result, "👿👿👿");
  return Boolean(result.changedRows);
}

/**
 * Modify user name.
 */
async function updateUserName(id: number, name: string): Promise<boolean> {
  const [result] = await mysql
    .pool()
    .query<ResultSetHeader>(`UPDATE user SET name = :name WHERE id = :id`, {
      name,
      id,
    });

  return Boolean(result.changedRows);
}

/**
 * Get user list.
 */
async function selectUserList(columns?: (keyof TUser)[]): Promise<TUser[]> {
  const cols = columns === undefined ? "*" : columns.join(",");

  const [result] = await mysql
    .pool()
    .query<TUser[]>(`SELECT ${cols} FROM user WHERE (1) ORDER BY id DESC`);

  return result;
}

/**
 * Get one user by id.
 */
async function selectUserById(id: number): Promise<TUser> {
  const sql = `SELECT * FROM user WHERE id = :id`;
  const [result] = await mysql.pool().query<TUser[]>(sql, {
    id,
  });

  return result[0];
}

/**
 * Get one user by email.
 */
async function selectUserByEmail(email: string): Promise<TUser> {
  const sql = `SELECT * FROM user WHERE email = :email`;
  const [result] = await mysql.pool().query<TUser[]>(sql, {
    email,
  });

  return result[0];
}

// **** Export default **** //

export default {
  insertUser,
  deleteUser,
  updateUserName,
  selectUserList,
  selectUserById,
  selectUserByEmail,
} as const;
