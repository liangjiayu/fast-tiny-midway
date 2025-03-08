import { BasePagesDto } from '@/common/dto/pages.dto';
import { ApiProperty } from '@midwayjs/swagger';

export class UserQueryDto extends BasePagesDto {
  @ApiProperty({
    description: '支持id查询，支持数组',
    isArray: true,
    items: {
      type: Number,
    },
  })
  ids: number[];

  @ApiProperty({
    description: '用户名查询',
  })
  username: string;

  @ApiProperty({
    description: '性别',
    example: 1,
  })
  gender: number;

  @ApiProperty({
    description: '元信息查询，支持模糊查询',
  })
  metadata: string;

  @ApiProperty({
    description: '开始时间，格式为yyyy-MM-dd HH:mm:ss',
    example: '2025-01-01 10:00:00',
  })
  startTime: string;

  @ApiProperty({
    description: '结束时间，格式为yyyy-MM-dd HH:mm:ss',
    example: '2030-02-01 18:00:00',
  })
  endTime: string;
}
