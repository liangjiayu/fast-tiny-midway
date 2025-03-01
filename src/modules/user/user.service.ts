import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userEntityModel: Repository<UserEntity>;

  async list() {
    return await this.userEntityModel.find();
  }

  /**
   * 创建用户
   */
  async create(userCreateDto: UserCreateDto) {
    const record = new UserEntity();
    record.username = userCreateDto.username;
    record.password = userCreateDto.password;

    await this.userEntityModel.save(record);
    return record.id;
  }

  /**
   * 更新用户
   */
  async update(id: number, userUpdateDto: UserUpdateDto) {
    const record = await this.userEntityModel.findOne({
      where: {
        id: id,
      },
    });
    this.userEntityModel.merge(record, userUpdateDto);
    return await this.userEntityModel.save(record);
  }

  /**
   * 删除用户
   */
  async delete(id: number) {
    return await this.userEntityModel.softDelete(id);
  }

  /**
   * 用户详情
   */
  async details(id: number) {
    const record = await this.userEntityModel.findOne({
      where: {
        id: id,
      },
    });
    return record;
  }
}
