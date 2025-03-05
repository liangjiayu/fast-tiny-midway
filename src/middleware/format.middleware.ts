import { BaseResult } from '@/common/response/base-result';
import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MESSAGE } from '@/constants';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return new BaseResult(
        RESPONSE_SUCCESS_CODE,
        RESPONSE_SUCCESS_MESSAGE,
        result
      );
    };
  }

  match(ctx: Context) {
    return ctx.path.includes('/api');
  }
}
