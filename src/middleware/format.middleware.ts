import { BaseResult } from '@/common/response/base-result';
import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MESSAGE } from '@/constants';
import { IMiddleware, Middleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return new BaseResult(RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MESSAGE, result);
    };
  }

  match(ctx: Context) {
    return ctx.path.includes('/api');
  }
}
