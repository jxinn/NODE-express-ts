import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";

import envVars from "@shared/env-vars";
import jwtUtil from "@util/jwt-util";
import { TAll } from "@shared/types";
import { CustomError } from "@shared/errors";

// **** Variables **** //

const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = "JWT not present in signed cookie.";

// **** Types **** //

type TValidatorFn = (arg: TAll) => boolean;
type TParamArr = {
  0: string;
  1?: string | TValidatorFn;
  2?: "body" | "query" | "params";
};

export interface ISessionUser extends JwtPayload {
  id: number;
}

// **** Functions **** //

export async function authMw(req: Request, res: Response, next: NextFunction) {
  // TODO: handler check
  if ("x-jwt" in req.headers) {
    const token = req.headers["x-jwt"];
    if (!token) {
      // TODO: Add Code.
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1004");
    }

    const decoded = await jwtUtil.decode<ISessionUser>(token.toString());
    if (typeof decoded === "object" && decoded.id) {
      // TODO: get user.
      const user = {};
      res.locals.sessionUser = user;
      next();
    } else {
      // TODO: Add Code.
      throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1004");
    }
  }
}

/**
 * Middleware to verify user logged in and is an an admin.
 */
export async function adminMw(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract the token
    const cookieName = envVars.cookieProps.key,
      jwt = req.signedCookies[cookieName];
    if (!jwt) {
      throw Error(jwtNotPresentErr);
    }
    // Make sure user role is an admin
    const clientData = await jwtUtil.decode<ISessionUser>(jwt);
    if (typeof clientData === "object" && clientData.role === UserRoles.Admin) {
      res.locals.sessionUser = clientData;
      next();
    } else {
      throw Error(jwtNotPresentErr);
    }
  } catch (err: unknown) {
    let error;
    if (typeof err === "string") {
      error = err;
    } else if (err instanceof Error) {
      error = err.message;
    }
    return res.status(UNAUTHORIZED).json({ error });
  }
}

/**
 * Checks if arg is a boolean, or a string that is 'true', or 'false'.
 */
function isBool(arg: string | boolean): boolean {
  if (typeof arg === "boolean") {
    return true;
  } else if (typeof arg === "string") {
    arg = arg.toLowerCase();
    return arg === "true" || arg === "false";
  } else {
    return false;
  }
}
