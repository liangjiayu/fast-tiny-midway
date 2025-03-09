import { BaseResult } from '@/common/response/base-result';
import { ErrorCodeEnum } from '@/constants/error-code';
import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError) {
    return new BaseResult(ErrorCodeEnum.VALIDATE_ERROR, err.message, null);
  }
}
