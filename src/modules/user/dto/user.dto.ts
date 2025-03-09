import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { UsersMetaData } from '../entity/usersMeta.entity';

export class UserCreateDto {
  @ApiProperty({
    description: '用户名，唯一',
    required: true,
  })
  @Rule(
    RuleType.string()
      .required()
      .pattern(/^[A-Z0-9]{6,20}$/i)
      .message('用户名必须是6-20位字母或数字'),
  )
  username: string;

  @ApiProperty({ description: '用户密码', required: true })
  @Rule(
    RuleType.string()
      .required()
      .pattern(/^[A-Z0-9]{6,20}$/i)
      .message('密码必须是6-20位字母或数字'),
  )
  password: string;
}

export class UserUpdateDto {
  @ApiProperty({ description: '用户手机号', example: '13800138000' })
  phoneNumber: string;

  @ApiProperty({
    description: '"用户性别，枚举类型：男(1)、女(2)、其他(3)',
    example: 1,
  })
  gender: number;

  @ApiProperty({ description: '用户称号', example: '小明' })
  nickname: string;

  @ApiProperty({
    description: '用户头像的URL',
    example: 'https://www.picture.com/',
  })
  profilePictureUrl: string;

  @ApiProperty({ description: '用户简介', example: '个性签名' })
  profileDescription: string;

  @ApiProperty({
    description: '用户元数据，存储额外的自定义信息',
    type: UsersMetaData,
  })
  metadata: UsersMetaData;
}
