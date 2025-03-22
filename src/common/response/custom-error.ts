import { CustomErrorEnum } from '@/constants/error-code';
import { MidwayError } from '@midwayjs/core';

/**
 * 自定义错误（业务错误）
 */
export class CustomError extends MidwayError {
  constructor(message: string, code?: string) {
    super(message, code || CustomErrorEnum.FAILED);
  }
}
