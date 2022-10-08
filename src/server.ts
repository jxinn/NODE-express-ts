import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import BaseRouter from "./routes/api";
import logger from "jet-logger";
import { CODES, CustomError } from "@shared/errors";
import envVars from "@shared/env-vars";
import { TCoreRes } from "@shared/types";

// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envVars.cookieProps.secret));

// Show routes called in console during development
if (envVars.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Security
if (envVars.nodeEnv === "production") {
  app.use(helmet());
}

// **** Add API routes **** //

// Add APIs
app.use("/api", BaseRouter);

// Setup error handler

app.use(
  (
    err: Error | CustomError,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __: NextFunction
  ) => {
    logger.err(err, true);
    // Return
    if (err instanceof CustomError) {
      return res.status(err.HttpStatus).json({
        result: false,
        code: err.Code,
        message: err.message,
        ...err.Add,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        result: false,
        code: "TP_9999",
        message: CODES.TP_9999,
      } as TCoreRes);
    }
  }
);

// **** Export default **** //

export default app;
