import * as e from "express";
import { Query } from "express-serve-static-core";

import { ISessionUser } from "@routes/middleware";

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

// **** DTO **** //
export interface ICoreRes {
  result: boolean;
  message?: string;
}

export interface IAddUserReq {
  name: string;
  email: string;
  pasword: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}
