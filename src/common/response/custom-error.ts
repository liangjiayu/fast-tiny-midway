import { CustomErrorEnum } from '@/constants/error-code';
import { MidwayError } from '@midwayjs/core';

export class CustomError extends MidwayError {
  constructor(message: string, code?: string) {
    super(message, code || CustomErrorEnum.FAILED);
  }
}
