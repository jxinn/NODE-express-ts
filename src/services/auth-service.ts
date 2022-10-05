import bcrypt from "bcrypt";

import jwtUtil from "@util/jwt-util";
import userModel from "@models/user-model";
import { TCreateUserReq, IUser } from "@shared/types";
import { CustomError } from "@shared/errors";
import { StatusCodes } from "http-status-codes";
// **** Functions **** //

/**
 * Create user.
 */
async function createUser(userReq: TCreateUserReq): Promise<number | null> {
  try {
    userReq.password = await bcrypt.hash(userReq.password, 10);
  } catch (error) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1002");
  }

  const userId = await userModel.createUser(userReq);

  if (!userId) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1001");
  }

  return userId;
}

/**
 * Select user detail.
 */
async function userDetail(userReq: TCreateUserReq): Promise<IUser> {
  const user = await userModel.userDetail(userReq.email);

  if (!user) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1003");
  }

  return user;
}

async function existUser(email: string) {
  const user = await userModel.userDetail(email);
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
  const hash = user.password ?? "";
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
 */

// **** Export default **** //

export default {
  createUser,
  userDetail,
} as const;
