import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

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
  @ApiProperty({ description: '用户手机号' })
  phoneNumber: string;

  @ApiProperty({ description: '"用户性别，枚举类型：男(1)、女(2)、其他(3)' })
  gender: number;

  @ApiProperty({ description: '用户称号' })
  nickname: string;

  @ApiProperty({ description: '用户头像的URL' })
  profilePictureUrl: string;

  @ApiProperty({ description: '用户简介' })
  profileDescription: string;
}
