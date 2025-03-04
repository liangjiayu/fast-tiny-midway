import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UserQueryDto } from './dto/query.dto';
import { CustomError } from '@/common/response/custom-error';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userEntityModel: Repository<UserEntity>;

  async list(query: UserQueryDto) {
    const [records, total] = await this.userEntityModel.findAndCount({
      skip: (query.pageNum - 1) * query.pageSize,
      take: query.pageSize,
    });
    return { records, total };
  }

  /**
   * 创建用户
   */
  async create(userCreateDto: UserCreateDto): Promise<number> {
    const record = new UserEntity();

    // 检查用户名是否已存在
    const usernameCount = await this.userEntityModel.findOne({
      where: {
        username: userCreateDto.username,
      },
      select: ['id', 'username'],
    });
    if (usernameCount) {
      throw new CustomError('用户名已存在!');
      // throw new Error('用户名已存在!');
    }

    this.userEntityModel.merge(record, userCreateDto);
    await this.userEntityModel.save(record);
    return record.id;
  }

  /**
   * 更新用户
   */
  async update(id: number, userUpdateDto: UserUpdateDto): Promise<boolean> {
    const record = await this.userEntityModel.findOne({
      where: {
        id: id,
      },
    });
    if (!record) {
      throw new Error('用户不存在!');
    }

    this.userEntityModel.merge(record, userUpdateDto);
    const result = await this.userEntityModel.save(record);
    return !!result;
  }

  /**
   * 删除用户
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.userEntityModel.delete(id);
    if (result?.affected === 0) {
      throw new Error('用户不存在!');
    }
    return true;
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
