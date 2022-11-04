import StatusCodes from "http-status-codes";
import {
  IReq,
  IRes,
  TaddUserReq,
  TCoreRes,
  TRemoveUserReq,
} from "@shared/types";
import { CODES } from "@shared/errors";
import userService from "@services/user-service";
import { body } from "express-validator";
import helper from "@shared/functions";

// Paths
const paths = {
  basePath: "/users",
  add: "/add",
  remove: "/remove",
  modify: "/modify",
  user: "user",
  list: "/list",
} as const;

// **** Functions **** //
/**
 * Add one user.
 */
async function addUser(req: IReq<TaddUserReq>, res: IRes<TCoreRes>) {
  await body("email").exists({ checkFalsy: true }).run(req);
  await body("password").exists({ checkFalsy: true }).run(req);
  await body("name")
    .exists({ checkFalsy: true })
    .withMessage("Create Custom Message !")
    .run(req);
  helper.validationHandling(req);

  await userService.addUser(req.body);

  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

/**
 * Remove one user.
 */
async function removeUser(req: IReq<TRemoveUserReq>, res: IRes<TCoreRes>) {
  await body("id").exists({ checkFalsy: true }).run(req);
  helper.validationHandling(req);

  console.log(res.locals);

  //await userService.removeUser(req.body);

  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

/**
 * Get all users.
 */
function getUserList(req: IReq, res: IRes<TCoreRes>) {
  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

/**
 * Get one user.
 */
function getUserDetail(req: IReq, res: IRes<TCoreRes>) {
  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

/**
 * Update one user.
 */
function editUser(req: IReq, res: IRes<TCoreRes>) {
  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

// **** Export default **** //

export default {
  paths,
  addUser,
  removeUser,
  getUserList,
  getUserDetail,
  editUser,
} as const;
