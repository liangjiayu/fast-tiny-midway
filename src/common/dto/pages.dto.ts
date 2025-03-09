import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 分页基础参数
 */
export class BasePagesDto {
  @ApiProperty({
    description: '页码，从第一页开始',
    default: 1,
  })
  @Rule(RuleType.number().min(1))
  pageNum: number = 1;

  @ApiProperty({
    description: '分页大小',
    default: 10,
  })
  @Rule(RuleType.number().min(1).max(200))
  pageSize: number = 10;
}

/**
 * 分页信息
 */
export class PageInfo<T> {
  /* 当前页码 */
  public readonly current: number;
  /* 分页大小 */
  public readonly size: number;
  /* 总数  */
  public total: number;
  /* 列表数据 */
  public records: T[] = [];

  constructor(pageNum: number, pageSize: number) {
    this.current = pageNum;
    this.size = pageSize;
  }

  get skip(): number {
    return (this.current - 1) * this.size;
  }
}
