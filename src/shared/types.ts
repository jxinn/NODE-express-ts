import * as e from "express";
import { Query } from "express-serve-static-core";

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

export interface IRes extends e.Response {
  locals: {
    sessionUser: ISessionUser;
  };
}

// **** ETC **** //

export enum UserRoles {
  Standard,
  Admin,
}

// **** DTO **** //

export type TCoreRes = {
  result: boolean;
  code: TCodes;
  message?: string;
};

export interface IUser extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}

export type TCreateUserReq = Pick<IUser, "name" | "email" | "password">;
export type TCreateUserRes = TCoreRes & { id?: number };

export type TUpdateUserReq = Partial<
  Pick<IUser, "id" | "name" | "email" | "password">
>;
