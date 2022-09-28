import bcrypt from "bcrypt";

import userRepo from "@repos/user-repo";
import mysql from "@repos/mysql";
import jwtUtil from "@util/jwt-util";
import { UnauthorizedError } from "@shared/errors";
import { ICoreRes } from "@shared/types";

// **** Functions **** //

async function createUser(): Promise<ICoreRes> {
  try {
    const [result] = await mysql
      .pool()
      .execute("SELECT * FROM `data` LIMIT 10");
    console.log(result);
    return {
      result: true,
    };
  } catch (error) {
    console.log("👿", error);
    return {
      result: false,
      message: "Could not create user",
    };
  }
}

/**
 * Login a user.
 */
async function getJwt(email: string, password: string): Promise<string> {
  // Fetch user
  const user = await userRepo.getOne(email);
  if (!user) {
    throw new UnauthorizedError();
  }
  // Check password
  const hash = user.pwdHash ?? "";
  const pwdPassed = await bcrypt.compare(password, hash);
  if (!pwdPassed) {
    throw new UnauthorizedError();
  }
  // Setup Admin Cookie
  return jwtUtil.sign({
    id: user.id,
    email: user.name,
    name: user.name,
    role: user.role,
  });
}

// **** Export default **** //

export default {
  createUser,
  getJwt,
} as const;
