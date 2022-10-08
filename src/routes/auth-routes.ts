import StatusCodes from "http-status-codes";
import authService from "@services/auth-service";
import {
  TCreateUserReq,
  IReq,
  IRes,
  TCreateUserRes,
  TLoginReq,
  TLoginRes,
} from "@shared/types";
import { validationResult, body } from "express-validator";
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
async function createUser(
  req: IReq<TCreateUserReq>,
  res: IRes<TCreateUserRes>
) {
  await body("name")
    .isLength({ min: 3 })
    .withMessage("이름은 최소 3글자 이상 입력해 주세요")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage("이메일을 확인해 주세요")
    .custom(async (value: string) => {
      const exists = await authService.checkEmail(value);
      if (exists) return Promise.reject();
    })
    .withMessage("이미 존재하는 이메일입니다")
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

  const userId = await authService.createUser(req.body);

  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
    id: userId,
  });
}

/**
 * Login a user.
 */
async function login(req: IReq<TLoginReq>, res: IRes<TLoginRes>) {
  await body("email")
    .exists({ checkFalsy: true })
    .withMessage("이메일을 입력해 주세요")
    .run(req);
  await body("password")
    .exists({ checkFalsy: true })
    .withMessage("비밀번호를 입력해 주세요")
    .run(req);

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const [error] = validation.array({ onlyFirstError: false });
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1000", error);
  }

  const token = await authService.login(req.body);

  return res.status(StatusCodes.OK).json({
    result: true,
    code: "TP_0000",
    token,
  });
}

// **** Export default **** //

export default {
  paths,
  createUser,
  login,
} as const;
