import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { BaseResult } from '@/common/response/base-result';
import { ErrorCodeEnum } from '@/common/response/error-code';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError) {
    return new BaseResult(ErrorCodeEnum.VALIDATE_ERROR, err.message, null);
  }
}
