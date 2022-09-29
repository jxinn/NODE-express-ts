import StatusCodes from "http-status-codes";

import authService from "@services/auth-service";
import envVars from "@shared/env-vars";
import { IReq, IRes } from "@shared/types";
import { validationResult, check } from "express-validator";
import { TCreateUserInput } from "@shared/types";

// **** Variables **** //

// Status codes
const { OK, BAD_REQUEST, CREATED } = StatusCodes;

// Paths
const paths = {
  basePath: "/auth",
  create: "/create",
  login: "/login",
  logout: "/logout",
} as const;

// **** Functions **** //

/**
 * Create user.
 */
async function createUser(req: IReq<TCreateUserInput>, res: IRes) {
  await check("name", "The name must be 5+ chars long and contain a number")
    .not()
    .isIn(["123", "password", "god"])
    .withMessage("Do not use a common word as the password")
    .isLength({ min: 5 })
    .run(req);
  await check("password").isLength({ min: 6 }).run(req);

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const [error] = validation.array({ onlyFirstError: false });
    return res.status(BAD_REQUEST).json(error);
  }

  const result = await authService.createUser(req.body);

  return res.status(CREATED).json(result);
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
} */

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  const { key, options } = envVars.cookieProps;
  res.clearCookie(key, options);
  return res.status(OK).end();
}

// **** Export default **** //

export default {
  paths,
  createUser,
  //login,
  logout,
} as const;
