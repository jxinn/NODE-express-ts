import userModel from "@models/user-model";
import { CustomError } from "@shared/errors";
import { eSELECT_USER, TUser } from "@shared/types";
import { StatusCodes } from "http-status-codes";

// **** Functions **** //

/**
 * Get all users.
 */
async function getUserDetail(id: number): Promise<TUser> {
  const user = await userModel.userDetail({
    case: eSELECT_USER.BY_ID,
    id,
  });

  if (!user) {
    throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, "TP_1007");
  }

  return user;
}

/**
 * Add one user.
 */

/**
 * Update one user.
 */

/**
 * Delete a user by their id.
 */

// **** Export default **** //

export default { getUserDetail } as const;
