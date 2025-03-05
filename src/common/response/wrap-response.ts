import { ApiProperty, ApiResponseMetadata } from '@midwayjs/swagger';
import { BaseResponse, PaginationInfo } from '../dto/base-response.dto';

type WrapResponseOptions = ApiResponseMetadata & {
  struct?: 'list' | 'page';
};

/**
 * 用于 Swagger文档响应体，包装统一响应结构
 * @param options 支持 struct: 'list' | 'page'
 */
export const wrapResponse = <T>(options?: WrapResponseOptions) => {
  // 默认返回 BaseResponse
  if (!options || !options.type) {
    return BaseResponse;
  }

  let wrapDataType = options.type;

  switch (options.struct) {
    // 返回列表结构
    case 'list':
      class ResponseListDataWrap {
        @ApiProperty({ type: wrapDataType, isArray: true })
        records: T[];
      }

      wrapDataType = ResponseListDataWrap;
      break;

    // 返回分页结构
    case 'page':
      class ResponsePageDataWrap extends PaginationInfo<T> {
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

  return BaseResponseWrap;
};
