import { MidwayError } from '@midwayjs/core';
import { CustomErrorEnum } from './error-code';

export class CustomError extends MidwayError {
  constructor(message: string, code?: string) {
    super(message, code || CustomErrorEnum.FAILED);
  }
}
