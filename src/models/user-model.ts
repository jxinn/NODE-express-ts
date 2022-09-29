import { TCreateUserInput } from "@shared/types";
import mysql from "@models/mysql";

/**
 * Create user.
 */
async function createUser(user: TCreateUserInput): Promise<number | null> {
  const [result] = await mysql
    .pool()
    .execute("INSERT INTO `user` (name, email, password) VALUES (?, ?, ?)", [
      user.name,
      user.email,
      user.password,
    ]);

  if ("insertId" in result) {
    return result.insertId;
  }

  return null;
}

// **** Export default **** //

export default {
  createUser,
} as const;
