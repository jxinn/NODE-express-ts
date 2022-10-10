import bcrypt from "bcrypt";
import jwtUtil from "@util/jwt-util";
import userModel from "@models/user-model";
import { eSELECT_USER, TCreateUserReq, TLoginReq } from "@shared/types";
import { CustomError } from "@shared/errors";
import { StatusCodes } from "http-status-codes";

// **** Functions **** //

/**
 * Create user.
 */
async function createUser(userReq: TCreateUserReq): Promise<number> {
  try {
    userReq.password = await bcrypt.hash(userReq.password, 10);
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1002");
  }

  const userId = await userModel.createUser(userReq);

  if (!userId) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1001");
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
 */
async function login(loginReq: TLoginReq): Promise<string> {
  const { email, password } = loginReq;
  const user = await userModel.userDetail({
    case: eSELECT_USER.BY_EMAIL,
    email,
  });

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1004");
  }

  const hash = user.password ?? "";
  const pwdPassed = await bcrypt.compare(password, hash);
  if (!pwdPassed) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1004");
  }

  return jwtUtil.sign({
    id: user.id,
  });
}

// **** Export default **** //

export default {
  createUser,
  checkEmail,
  login,
} as const;
