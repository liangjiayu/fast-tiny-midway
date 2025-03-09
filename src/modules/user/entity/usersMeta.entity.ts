import { ApiExtraModel, ApiProperty } from '@midwayjs/swagger';

export class UsersMetaContacts {
  @ApiProperty({ description: '联系人姓名', example: '家长' })
  name: string;

  @ApiProperty({ description: '联系人手机号码', example: '13800138000' })
  phone: string;

  @ApiProperty({ description: '是否主要联系人' })
  isPrimary: boolean;
}

@ApiExtraModel(UsersMetaContacts)
export class UsersMetaData {
  @ApiProperty({ description: '博客地址', example: 'https://www.blog.com/' })
  blogUrl: string;

  @ApiProperty({
    description: 'Facebook链接格式不正确',
    example: 'https://www.facebook.com/',
  })
  facebookUrl: string;

  @ApiProperty({
    description: '联系人信息',
    required: false,
    type: Array,
    items: {
      type: UsersMetaContacts,
    },
  })
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
