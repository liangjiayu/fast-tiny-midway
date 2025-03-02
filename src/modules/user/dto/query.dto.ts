import { BasePagesDto } from '@/common/dto/pages.dto';
import { ApiProperty } from '@midwayjs/swagger';

export class UserQueryDto extends BasePagesDto {
  @ApiProperty({
    description: '用户名',
  })
  public username: string;
}
