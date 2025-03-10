import { BaseResult } from '@/common/response/base-result';
import { CustomError } from '@/common/response/custom-error';
import { ErrorCodeEnum } from '@/constants/error-code';
import { Catch } from '@midwayjs/core';

/**
 * 自定义错误过滤器
 */
@Catch(CustomError)
export class CustomErrorFilter {
  async catch(err: CustomError) {
    const code
      = typeof err.code === 'string' ? Number(err?.code?.split('_')[1]) : ErrorCodeEnum.FAILED;

    return new BaseResult(code, err.message, null);
  }
}
