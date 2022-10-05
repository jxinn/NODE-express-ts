import { TCreateUserReq, TUpdateUserReq, IUser } from "@shared/types";
import mysql from "@models/mysql";
import type { FieldPacket, RowDataPacket } from "mysql2";

// **** Functions **** //

/**
 * Create user.
 */
async function createUser(user: TCreateUserReq): Promise<number | null> {
  const [result] = await mysql
    .pool()
    .execute(
      "INSERT INTO `ck_test` (`name`, `email`, `password`) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );

  if ("insertId" in result) {
    return result.insertId;
  }

  return null;
}

/**
 * Update user.
 */
async function updateUser(user: TUpdateUserReq): Promise<number | null> {
  const [result] = await mysql
    .pool()
    .execute("UPDATE `ck_test` SET `uri` = ? WHERE `id` = ? ", [
      user.name,
      user.id,
    ]);

  console.log(result);
  return null;
}

/**
 * Delete user.
 */
async function deleteUser(user: TUpdateUserReq): Promise<number | null> {
  const [result] = await mysql
    .pool()
    .execute("UPDATE `ck_test` SET `uri` = ? WHERE `id` = ? ", [
      user.name,
      user.id,
    ]);

  console.log(result);
  return null;
}

/**
 * Select user list.
 */
async function userList(user: TUpdateUserReq): Promise<number | null> {
  const [result] = await mysql
    .pool()
    .execute("UPDATE `ck_test` SET `uri` = ? WHERE `id` = ? ", [
      user.name,
      user.id,
    ]);

  console.log(result);
  return null;
}

/**
 * Select user detail.
 */
async function userDetail(eamil: string): Promise<IUser> {
  const [result] = await mysql
    .pool()
    .execute<IUser[]>("SELECT delete_flag FROM `ck_test` WHERE `email` = ? ", [
      eamil,
    ]);

  return result[0];
}

// **** Export default **** //

export default {
  createUser,
  updateUser,
  deleteUser,
  userList,
  userDetail,
} as const;
