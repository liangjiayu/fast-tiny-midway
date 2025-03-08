import { ApiProperty } from '@midwayjs/swagger';
import { getSchema, Rule, RuleType } from '@midwayjs/validate';
import { UsersMetaData } from '../entity/usersMeta.entity';

export class UserCreateDto {
  @ApiProperty({
    description: '用户名，唯一',
    required: true,
  })
  @Rule(
    RuleType.string()
      .required()
      .pattern(/^[A-Za-z0-9]{6,20}$/)
      .message('用户名必须是6-20位字母或数字')
  )
  username: string;

  @ApiProperty({ description: '用户密码', required: true })
  @Rule(
    RuleType.string()
      .required()
      .pattern(/^[A-Za-z0-9]{6,20}$/)
      .message('密码必须是6-20位字母或数字')
  )
  password: string;
}

export class UserUpdateDto {
  @ApiProperty({ description: '用户手机号', example: '13800138000' })
  @Rule(
    RuleType.string()
      .pattern(/^1[3-9]\d{9}$/)
      .message('手机号格式不正确')
  )
  phoneNumber: string;

  @ApiProperty({
    description: '"用户性别，枚举类型：男(1)、女(2)、其他(3)',
    example: 1,
  })
  @Rule(RuleType.number().valid(1, 2, 3).error(new Error('性别编码不正确')))
  gender: number;

  @ApiProperty({ description: '用户称号', example: '小明' })
  @Rule(RuleType.string().min(2).max(16).message('称号长度必须在2-16之间'))
  nickname: string;

  @ApiProperty({
    description: '用户头像的URL',
    example: 'https://www.picture.com/',
  })
  @Rule(RuleType.string().allow(null).uri().message('头像URL格式不正确'))
  profilePictureUrl: string;

  @ApiProperty({ description: '用户简介', example: '个性签名' })
  profileDescription: string;

  @ApiProperty({
    description: '用户元数据，存储额外的自定义信息',
    type: UsersMetaData,
  })
  @Rule(getSchema(UsersMetaData))
  metadata: UsersMetaData;
}
