import { ApiExtraModel, ApiProperty } from '@midwayjs/swagger';
import { getSchema, Rule, RuleType } from '@midwayjs/validate';

export class UsersMetaContacts {
  @ApiProperty({ description: '联系人姓名', example: '家长' })
  @Rule(RuleType.string().required().error(new Error('联系人姓名不能为空')))
  name: string;

  @ApiProperty({ description: '联系人手机号码', example: '13800138000' })
  @Rule(
    RuleType.string()
      .required()
      .pattern(/^1[3-9]\d{9}$/)
      .message('手机号格式不正确')
  )
  phone: string;

  @ApiProperty({ description: '是否主要联系人' })
  isPrimary: boolean;
}

@ApiExtraModel(UsersMetaContacts)
export class UsersMetaData {
  @ApiProperty({ description: '博客地址', example: 'https://www.blog.com/' })
  @Rule(RuleType.string().uri().message('博客链接格式不正确'))
  blogUrl: string;

  @ApiProperty({
    description: 'Facebook链接格式不正确',
    example: 'https://www.facebook.com/',
  })
  @Rule(RuleType.string().uri().message('Facebook链接格式不正确'))
  facebookUrl: string;

  @ApiProperty({
    description: '联系人信息',
    required: false,
    type: Array,
    items: {
      type: UsersMetaContacts,
    },
  })
  @Rule(RuleType.array().items(getSchema(UsersMetaContacts)))
  contacts: UsersMetaContacts[];

  @ApiProperty({
    description: '手机号码是否已验证',
    example: false,
  })
  phoneVerified: boolean;

  @ApiProperty({
    description: '是否订阅通知',
    example: false,
  })
  subscribed: boolean;
}
