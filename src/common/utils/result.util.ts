import { ApiProperty, Type } from '@midwayjs/swagger';

export const ResultCode = {
  SUCCESS: { code: 200, message: '操作成功' },
  FAILED: { code: 500, message: '操作失败' },
};

type ResultCodeType = keyof typeof ResultCode;

/**
 * 通用返回结果
 */
export class CommonResult<T> {
  @ApiProperty({ description: '状态码', default: 200 })
  code: number;
  @ApiProperty({ description: '消息', default: '操作成功' })
  message: string;
  @ApiProperty({ description: '结果主体', default: null })
  data: T;

  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * 成功返回结果
   * @param data 返回的数据
   */
  static success<T>(data: T): CommonResult<T>;

  /**
   * 成功返回结果
   * @param data 返回的数据
   * @param message 返回的消息
   */
  static success<T>(data: T, message: string): CommonResult<T>;

  static success<T>(data: T, message?: string): CommonResult<T> {
    const codeInfo = ResultCode.SUCCESS;
    const finalMessage = message || codeInfo.message;
    return new CommonResult(codeInfo.code, finalMessage, data);
  }

  /**
   * 失败返回结果
   * @param codeType ResultCode 的 key
   */
  static failed(codeType: ResultCodeType): CommonResult<null>;

  /**
   * 失败返回结果
   * @param code 错误码
   * @param message 错误信息
   */
  static failed(code: number, message: string): CommonResult<null>;

  /**
   * 失败返回结果
   * @param message 错误信息
   */
  static failed(message: string): CommonResult<null>;

  static failed(
    arg1: ResultCodeType | number | string,
    arg2?: string
  ): CommonResult<null> {
    // 类型守卫：判断是否为 ResultCode 的 key
    const isCodeKey = (s: string): s is ResultCodeType =>
      Object.keys(ResultCode).includes(s);

    if (typeof arg1 === 'string' && isCodeKey(arg1)) {
      const { code, message } = ResultCode[arg1];
      return new CommonResult(code, message, null);
    }

    if (typeof arg1 === 'number' && typeof arg2 === 'string') {
      return new CommonResult(arg1, arg2, null);
    }

    if (typeof arg1 === 'string') {
      return new CommonResult(ResultCode.FAILED.code, arg1, null!);
    }

    throw new Error('Invalid failed parameters');
  }
}

export function SuccessWrapper<T>(ResourceCls: Type<T>) {
  class Successed {
    @ApiProperty({ description: '状态码', default: 200 })
    code: number;

    @ApiProperty({ description: '消息', default: '操作成功' })
    message: string;

    @ApiProperty({
      type: ResourceCls,
    })
    data: T;
  }

  return Successed;
}
