import * as e from "express";
import { Query, Send } from "express-serve-static-core";
import { TCodes } from "./errors";
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "@models/user-model";

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
  locals: {
    user: TUser;
  };
  json: Send<T, this>;
}

// **** ETC **** //
export type TPayload = {
  id: number;
} & JwtPayload;

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

// **** Login **** //
export type TLoginReq = {
  email: string;
  password: string;
  recaptcha: string;
};
export type TLoginRes = TCoreRes & { token?: string };

// **** User **** //
export type TaddUserReq = {
  email: string;
  password: string;
  name: string;
};
export type TaddUserRes = TCoreRes;

export type TRemoveUserReq = {
  id: number;
};
export type TRemoveUserRes = TCoreRes;
