import { ApiProperty, ApiResponseMetadata, Type } from '@midwayjs/swagger';
import { BasePagination, BaseResponse } from './base-response';

type WrapResponseOptions = ApiResponseMetadata & {
  /** 响应体的类型，可为实体、基础类型（数字、布尔、字符串） */
  type?: Type;
  /** 响应体数据结构，数组类型，分页类型 */
  struct?: 'List' | 'Page';
};

/**
 * 用于 Swagger文档 响应体定义，生成统一响应结构
 */
export function wrapResponse<T>(options?: WrapResponseOptions) {
  // 默认返回 BaseResponse
  if (!options || !options.type) {
    return BaseResponse;
  }

  let wrapDataType = options.type;

  /**
   * 生成 swagger类型名称
   */
  function defineSchemaName(
    o: any,
    type: WrapResponseOptions['type'],
    struct?: WrapResponseOptions['struct'],
  ): void {
    const typeName = ((): string => {
      if (typeof type === 'string') {
        return type;
      } else if (Array.isArray(type)) {
        return type[0].name;
      } else {
        return type!.name;
      }
    })();

    const name = struct ? `${typeName}${struct}` : typeName;

    Object.defineProperty(o, 'name', {
      writable: true,
      value: `BaseResponse<${name}>`,
    });
  }

  switch (options.struct) {
    // 返回列表结构
    case 'List':
      // eslint-disable-next-line no-case-declarations
      class ResponseListDataWrap {
        @ApiProperty({ type: wrapDataType, isArray: true })
        declare records: T[];
      }

      wrapDataType = ResponseListDataWrap;
      break;

    // 返回分页结构
    case 'Page':
      // eslint-disable-next-line no-case-declarations
      class ResponsePageDataWrap extends BasePagination<T> {
        @ApiProperty({ type: wrapDataType, isArray: true })
        declare records: T[];
      }

      wrapDataType = ResponsePageDataWrap;
      break;
  }

  // 添加 统一响应结构
  class BaseResponseWrap extends BaseResponse<T> {
    @ApiProperty({ type: wrapDataType })
    declare data: T;
  }

  defineSchemaName(BaseResponseWrap, options.type, options.struct);
  return BaseResponseWrap;
}
