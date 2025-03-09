import { MidwayValidationError } from '@midwayjs/validate';
import { ZodType } from 'zod';

/**
 * zod校验
 * @param schema 检验规则
 * @param data 检验数据
 */
export function zodValidate(schema: ZodType, data: any) {
  const checkResult = schema.safeParse(data);
  if (!checkResult.success) {
    const firstError = checkResult.error.errors[0];

    throw new MidwayValidationError(`${firstError.path}: ${firstError.message}`, 422, firstError);
  }
  return true;
}
