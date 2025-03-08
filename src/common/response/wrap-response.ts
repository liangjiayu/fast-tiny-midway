import { ApiProperty, ApiResponseMetadata, Type } from '@midwayjs/swagger';
import { BaseResponse, BasePagination } from './base-response';

type WrapResponseOptions = ApiResponseMetadata & {
  type?: Type;
  struct?: 'List' | 'Page';
};

/**
 * 用于 Swagger文档 响应体定义，生成统一响应结构
 */
export const wrapResponse = <T>(options?: WrapResponseOptions) => {
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
    struct?: WrapResponseOptions['struct']
  ): void {
    const typeName = ((): string => {
      if (typeof type === 'string') {
        return type;
      } else if (type instanceof Array) {
        return type[0].name;
      } else {
        return type.name;
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
      class ResponseListDataWrap {
        @ApiProperty({ type: wrapDataType, isArray: true })
        records: T[];
      }

      wrapDataType = ResponseListDataWrap;
      break;

    // 返回分页结构
    case 'Page':
      class ResponsePageDataWrap extends BasePagination<T> {
        @ApiProperty({ type: wrapDataType, isArray: true })
        records: T[];
      }

      wrapDataType = ResponsePageDataWrap;
      break;
  }

  // 添加 统一响应结构
  class BaseResponseWrap extends BaseResponse<T> {
    @ApiProperty({ type: wrapDataType })
    data: T;
  }

  defineSchemaName(BaseResponseWrap, options.type, options.struct);
  return BaseResponseWrap;
};
