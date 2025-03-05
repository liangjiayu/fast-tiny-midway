import { CustomError } from '@/common/response/custom-error';
import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ErrorCodeEnum } from '@/constants/error-code';
import { BaseResult } from '@/common/response/base-result';

@Catch(CustomError)
export class CustomErrorFilter {
  async catch(err: CustomError, ctx: Context) {
    const code =
      typeof err.code === 'string'
        ? Number(err?.code?.split('_')[1])
        : ErrorCodeEnum.FAILED;

    return new BaseResult(code, err.message, null);
  }
}
