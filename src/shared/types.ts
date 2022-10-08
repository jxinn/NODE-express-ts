import * as e from "express";
import { Query, Send } from "express-serve-static-core";

import { ISessionUser } from "@routes/middleware";
import { TCodes } from "./errors";
import { RowDataPacket } from "mysql2/promise";

// **** Misc **** //

export type TAll = string | number | boolean | null | object;

// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes<T = void> extends e.Response {
  json: Send<T, this>;
}

// **** ETC **** //

export enum UserRoles {
  Standard,
  Admin,
}

// **** ENTITIY **** //

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
} & RowDataPacket;

// **** DTO **** //

export type TCoreRes = {
  result: boolean;
  code: TCodes;
  message?: string;
};

export type TCreateUserReq = Pick<TUser, "name" | "email" | "password">;
export type TCreateUserRes = TCoreRes & { id?: number };

export type TLoginReq = Pick<TUser, "email" | "password">;
export type TLoginRes = TCoreRes & { token?: string };

export type TUpdateUserReq = Partial<
  Pick<TUser, "id" | "name" | "email" | "password">
>;

export enum eSELECT_USER {
  BY_ID,
  BY_EMAIL,
  BY_NAME_EMAIL,
}
export type TSelectUserById = Pick<TUser, "id"> & {
  case: eSELECT_USER.BY_ID;
};
export type TSelectUserByEmail = Pick<TUser, "email"> & {
  case: eSELECT_USER.BY_EMAIL;
};
export type TSelectUserByNameEmail = Pick<TUser, "name" | "email"> & {
  case: eSELECT_USER.BY_NAME_EMAIL;
};
