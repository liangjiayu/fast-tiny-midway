import { ApiProperty } from '@midwayjs/swagger';

export class BasePagesDto {
  @ApiProperty({
    description: '页码，从1开始',
    default: 1,
  })
  public pageNum: number = 1;

  @ApiProperty({
    description: '分页大小',
    default: 10,
  })
  public pageSize: number = 10;
}
