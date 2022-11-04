import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "./errors";
import { IReq } from "./types";

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Handling validation exceptions.
 */
function validationHandling<T = void>(req: IReq<T>): void {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    const [error] = validation.array({ onlyFirstError: false });
    throw new CustomError(StatusCodes.BAD_REQUEST, "TP_1000", error);
  }
}
// **** Export default **** //

export default {
  getRandomInt,
  validationHandling,
} as const;
