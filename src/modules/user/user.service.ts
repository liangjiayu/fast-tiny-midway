import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userEntityModel: Repository<UserEntity>;

  async list() {
    return await this.userEntityModel.find();
  }
}
