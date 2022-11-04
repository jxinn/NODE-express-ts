import bcrypt from "bcrypt";
import jwtUtil from "@util/jwt-util";
import userModel from "@models/user-model";
import { CustomError } from "@shared/errors";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import envVars from "@shared/env-vars";

// **** Types **** //
type TLoginParams = {
  email: string;
  password: string;
  recaptcha: string;
};

type TReCAPTCHARes = {
  success: boolean;
  "error-codes"?: string;
};

// **** Functions **** //
/**
 * Login a user.
 */
async function login(params: TLoginParams): Promise<string> {
  try {
    const response = await axios.post<TReCAPTCHARes>(envVars.recaptcha.url, {
      secret: envVars.recaptcha.privateKey,
      response: params.recaptcha,
    });

    if (!Boolean(response.data.success)) {
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
        check: "(login) !Boolean(response.data.success)",
      });
    }
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(login) reCAPTCHA catch",
    });
  }

  const user = await userModel.selectUserByEmail(params.email);

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(login) !user",
    });
  }

  const hash = user.password ?? "";

  const pwdPassed = await bcrypt.compare(params.password, hash);
  if (!pwdPassed) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(login) !pwdPassed",
    });
  }

  try {
    return jwtUtil.sign({
      id: user.id,
    });
  } catch (error) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(login) jwtUtil.sign",
    });
  }
}

// **** Export default **** //

export default {
  login,
} as const;
