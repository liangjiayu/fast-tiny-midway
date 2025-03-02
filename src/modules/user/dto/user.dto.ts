import { Rule, RuleType } from '@midwayjs/validate';

export class UserCreateDto {
  @Rule(RuleType.string().required())
  username: string;
  @Rule(RuleType.string().required())
  password: string;
}

export class UserUpdateDto {
  phoneNumber: string;
  gender: number;
  nickname: string;
  profilePictureUrl: string;
  profileDescription: string;
}
