import StatusCodes from "http-status-codes";

import authService from "@services/auth-service";
import envVars from "src/shared/env-vars";
import { TCreateUserReq, IReq, IRes, TCreateUserRes } from "@shared/types";
import { validationResult, body, CustomValidator } from "express-validator";
import { CODES, CustomError } from "@shared/errors";

// **** Variables **** //

// Paths
const paths = {
  basePath: "/auth",
  create: "/createUser",
  login: "/login",
  logout: "/logout",
} as const;

// **** Functions **** //

/**
 * Create an account.
 */
async function createUser(req: IReq<TCreateUserReq>, res: IRes) {
  await body("name")
    .isLength({ min: 3 })
    .withMessage("이름은 최소 3글자 이상 입력해 주세요")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage("이메일을 확인해 주세요")
    .custom(async (value) => {
      //const user = await authService.userDetail(req.body);
      return true;
    })
    .withMessage("이미 존재하는 이메일입니다.")
    .run(req);
  await body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    )
    .withMessage(
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 혼합하여 최소 8자리 이상으로 입력해 주세요"
    )
    .run(req);

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const [error] = validation.array({ onlyFirstError: false });
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1000", error);
  }

  const tt = await authService.userDetail(req.body);
  return res.status(StatusCodes.CREATED).json(tt);

  const userId = await authService.createUser(req.body);

  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
    id: userId,
  } as TCreateUserRes);
}

/**
 * Login a user.
 
async function login(req: IReq<ILoginReq>, res: IRes) {
  const { email, password } = req.body;
  // Add jwt to cookie
  const jwt = await authService.getJwt(email, password);
  const { key, options } = envVars.cookieProps;
  res.cookie(key, jwt, options);
  // Return
  return res.status(OK).end();
}
*/

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  const { key, options } = envVars.cookieProps;
  res.clearCookie(key, options);
  return res.status(StatusCodes.OK).end();
}

// **** Export default **** //

export default {
  paths,
  createUser,
  logout,
} as const;
