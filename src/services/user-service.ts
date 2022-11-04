import userModel, { TaddUserParams, TUser } from "@models/user-model";
import { CustomError } from "@shared/errors";
import { StatusCodes } from "http-status-codes";
import { emitWarning } from "process";

// **** Types **** //
type TModifyUserNameParams = {
  id: number;
  name: string;
  email: string;
};

// **** Functions **** //
/**
 * Add one user.
 */
async function addUser(params: TaddUserParams): Promise<number> {
  // TODO: password encrypt.
  const insertId = await userModel.insertUser(params);

  if (!insertId) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(addUser) !insertId",
    });
  }
  return insertId;
}

/**
 * Remove one user.
 */
async function removeUser(id: number, email: string): Promise<boolean> {
  _verifyUser(id, email);
  const result = await userModel.deleteUser(id);

  if (!result) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(removeUser) !result",
    });
  }

  return result;
}

/**
 * Modify user name.
 */
async function modifyUserName(data: TModifyUserNameParams): Promise<boolean> {
  const { id, name, email } = data;
  _verifyUser(id, email);

  const result = await userModel.updateUserName(id, name);

  if (!result) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(modifyUserName) !result",
    });
  }

  return result;
}

/**
 * Get user list.
 */
async function getUserList(): Promise<TUser[]> {
  const users = await userModel.selectUserList();

  if (users.length === 0) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(getUserList) sections.length === 0",
    });
  }

  return users;
}

/**
 * Get one user by id.
 */
async function getUserById(id: number): Promise<TUser> {
  const user = userModel.selectUserById(id);

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(getUserById) !user",
    });
  }
  return user;
}

/**
 * Get one user by email.
 */
async function getUserByEmail(email: string): Promise<TUser> {
  const user = userModel.selectUserByEmail(email);

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(getUserByEmail) !user",
    });
  }
  return user;
}

/**
 * User verification.
 */
async function _verifyUser(id: number, email: string): Promise<TUser> {
  const user = await userModel.selectUserById(id);

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(_verifySection) !user",
    });
  }

  if (user.email !== email) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_9999", {
      check: "(_verifyUser) user.email !== email",
    });
  }

  return user;
}

// **** Export default **** //

export default {
  addUser,
  removeUser,
  modifyUserName,
  getUserList,
  getUserById,
  getUserByEmail,
} as const;
