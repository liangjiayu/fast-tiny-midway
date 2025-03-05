import { registerErrorCode } from '@midwayjs/core';

export enum ErrorCodeEnum {
  FAILED = 500,
  PARAMETER_ERROR = 400,
  VALIDATE_ERROR = 422,
}

export const ErrorCodeMap = {
  [ErrorCodeEnum.FAILED]: '系统错误',
  [ErrorCodeEnum.PARAMETER_ERROR]: '参数错误',
  [ErrorCodeEnum.VALIDATE_ERROR]: '参数验证错误',
};

export const CustomErrorEnum = registerErrorCode('custom', ErrorCodeEnum);
