import { RESPONSE_SUCCESS_CODE, RESPONSE_SUCCESS_MESSAGE } from '@/constants';
import { ApiProperty } from '@midwayjs/swagger';

/**
 * 用于swagger的分页响应体（只做类型定义）
 */
export class BasePagination<T> {
  @ApiProperty({ default: 1, description: '当前页码' })
  current: number;

  @ApiProperty({ default: 10, description: '分页大小' })
  size: number;

  @ApiProperty({ description: '列表总数' })
  total: number;

  @ApiProperty({ description: '列表数据' })
  records: T[];
}

/**
 * 用于swagger的统一响应体（只做类型定义）
 */
export class BaseResponse<T> {
  @ApiProperty({
    default: RESPONSE_SUCCESS_CODE,
    description: '状态码',
  })
  code: number;

  @ApiProperty({
    default: RESPONSE_SUCCESS_MESSAGE,
    description: '消息主体',
  })
  message: string;

  @ApiProperty({
    description: '数据主体',
  })
  data: T;
}
