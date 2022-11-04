import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import jwtUtil from "@util/jwt-util";
import { CustomError } from "@shared/errors";
import { TPayload } from "@shared/types";
import userService from "@services/user-service";
import { TOKEN_KEY } from "@shared/constants";

// **** Functions **** //

export async function authMw(req: Request, res: Response, next: NextFunction) {
  const token = req.headers[TOKEN_KEY];
  if (!token) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1005");
  }

  const decoded = await jwtUtil.decode<TPayload>(token.toString());
  if (typeof decoded === "object" && decoded.id) {
    const user = userService.getUserById(decoded.id);
    res.locals.sessionUser = user;
    next();
  } else {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1006");
  }
}
