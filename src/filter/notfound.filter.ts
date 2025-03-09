import type { MidwayHttpError } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import { Catch, httpError } from '@midwayjs/core';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(_: MidwayHttpError, ctx: Context) {
    // 404 错误会到这里
    ctx.redirect('/404.html');
  }
}
