import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class UserCreateDto {
  @ApiProperty({ description: '用户名，唯一' })
  @Rule(RuleType.string().required())
  username: string;

  @ApiProperty({ description: '用户密码' })
  @Rule(RuleType.string().required())
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
