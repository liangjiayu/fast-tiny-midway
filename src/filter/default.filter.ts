import { BaseResult } from '@/common/response/base-result';
import { ErrorCodeEnum } from '@/constants/error-code';
import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    // 所有的未分类错误会到这里
    return new BaseResult(ErrorCodeEnum.FAILED, err.message, null);
  }
}
