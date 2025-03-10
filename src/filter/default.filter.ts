import { BaseResult } from '@/common/response/base-result';
import { ErrorCodeEnum } from '@/constants/error-code';
import { Catch } from '@midwayjs/core';

/**
 * 全局错误过滤器
 */
@Catch()
export class DefaultErrorFilter {
  async catch(err: Error) {
    // 所有的未分类错误会到这里
    return new BaseResult(ErrorCodeEnum.FAILED, err.message, null);
  }
}
