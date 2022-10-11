import StatusCodes from "http-status-codes";

//import userService from '@services/user-service';
import { IReq, IRes, TCoreRes } from "@shared/types";
import { CODES } from "@shared/errors";

// Paths
const paths = {
  basePath: "/users",
  get: "/all",
  add: "/add",
  update: "/update",
  delete: "/delete/:id",
} as const;

// **** Functions **** //

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

/**
 * Delete one user.
 */
function deleteUser(req: IReq, res: IRes<TCoreRes>) {
  return res.status(StatusCodes.CREATED).json({
    result: true,
    code: "TP_0000",
    message: CODES.TP_0000,
  });
}

// **** Export default **** //

export default {
  paths,
  getUserList,
  getUserDetail,
  editUser,
  deleteUser,
} as const;
