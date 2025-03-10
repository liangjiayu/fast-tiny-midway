import { BaseResult } from '@/common/response/base-result';
import { ErrorCodeEnum } from '@/constants/error-code';
import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';

/**
 * 参数校验过滤器
 */
@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError) {
    return new BaseResult(ErrorCodeEnum.VALIDATE_ERROR, err.message, null);
  }
}
