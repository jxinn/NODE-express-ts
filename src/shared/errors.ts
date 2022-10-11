import { StatusCodes } from "http-status-codes";

// **** Variables **** //

export const CODES = {
  TP_0000: "완료되었습니다", // 성공.
  TP_9999: "잠시 후 시도해 주세요", // 기타 에러.
  TP_1000: "하나 이상의 필수 항목이 누락되었거나 잘못되었습니다", // 유효성 검사 실패.
  TP_1001: "잠시 후 시도해 주세요", // 계정 생성 실패.
  TP_1002: "잠시 후 시도해 주세요", // 비밀번호 암호화 실패.
  TP_1003: "잠시 후 시도해 주세요", // 유저 조회 실패.
  TP_1004: "가입된 이메일이 아니거나 비밀번호가 틀립니다", // 로그인 실패.
  TP_1005: "잘못된 요청입니다", // JWT Token.
  TP_1006: "잘못된 요청입니다", // JWT Token decoded ID is null.
  TP_1007: "잠시 후 시도해 주세요", // 유저 조회 실패.
} as const;

// **** Types **** //

export type TCodes = keyof typeof CODES;

// **** Class **** //

export class CustomError extends Error {
  public readonly HttpStatus: StatusCodes;
  public readonly Code: TCodes;
  public readonly Add: object;

  constructor(httpStatus: StatusCodes, code: TCodes, add: object = {}) {
    super(CODES[code]);
    this.HttpStatus = httpStatus;
    this.Code = code;
    this.Add = add;
  }
}
