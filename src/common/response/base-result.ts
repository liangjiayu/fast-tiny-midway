export class BaseResult<T> {
  public code: number;
  public message: string;
  public data: T;
  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export const RESPONSE_SUCCESS_CODE = 200;
export const RESPONSE_SUCCESS_MESSAGE = '操作成功';
