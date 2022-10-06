import bcrypt from "bcrypt";

import jwtUtil from "@util/jwt-util";
import userModel from "@models/user-model";
import { eSELECT_USER, TCreateUserReq, TUser } from "@shared/types";
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
 * Check the presence of a user.
 */
async function checkEmail(email: string): Promise<boolean> {
  const user = await userModel.userDetail({
    case: eSELECT_USER.BY_EMAIL,
    email,
  });

  return Boolean(user);
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
  checkEmail,
} as const;
