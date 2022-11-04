import StatusCodes from "http-status-codes";
import authService from "@services/auth-service";
import { IReq, IRes, TLoginReq, TLoginRes } from "@shared/types";
import { body } from "express-validator";
import { CustomError } from "@shared/errors";
import helper from "@shared/functions";
// **** Variables **** //

// Paths
const paths = {
  basePath: "/auth",
  login: "/login",
} as const;

// **** Functions **** //
/**
 * Login a user.
 */
async function login(req: IReq<TLoginReq>, res: IRes<TLoginRes>) {
  await body("email")
    .exists({ checkFalsy: true })
    .withMessage("아이디를 입력해 주세요")
    .run(req);
  await body("password")
    .exists({ checkFalsy: true })
    .withMessage("비밀번호를 입력해 주세요")
    .run(req);
  await body("recaptcha")
    .exists({ checkFalsy: true })
    .withMessage("체크박스를 선택해주세요")
    .run(req);
  helper.validationHandling(req);

  try {
    const token = await authService.login(req.body);

    return res.status(StatusCodes.OK).json({
      result: true,
      code: "TP_0000",
      token,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.HttpStatus, error.Code, error.Add);
    } else {
      console.log(error);
      throw new CustomError(StatusCodes.BAD_REQUEST, "TP_9999");
    }
  }
}

// **** Export default **** //

export default {
  paths,
  login,
} as const;
