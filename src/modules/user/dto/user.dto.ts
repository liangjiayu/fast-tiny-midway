export class UserCreateDto {
  username: string;
  password: string;
}

export class UserUpdateDto {
  phoneNumber: string;
  gender: number;
  nickname: string;
  profilePictureUrl: string;
  profileDescription: string;
}
