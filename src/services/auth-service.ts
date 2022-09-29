import bcrypt from "bcrypt";

import jwtUtil from "@util/jwt-util";
import { UnauthorizedError } from "@shared/errors";
import { TCreateUserInput, ICreateUserOutput } from "@shared/types";
import userModel from "@models/user-model";

// **** Functions **** //

async function createUser(user: TCreateUserInput): Promise<ICreateUserOutput> {
  try {
    const reuslt = await userModel.createUser(user);
    if (!reuslt) {
      return {
        result: false,
      };
    }

    return {
      result: true,
      id: reuslt,
    };
  } catch (error) {
    return {
      result: false,
      message: "Could not create user",
    };
  }
}

/**
 * Login a user.

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
} */

// **** Export default **** //

export default {
  createUser,
  //getJwt,
} as const;
