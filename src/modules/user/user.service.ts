import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import {
  FindOptionsWhere,
  Repository,
  Like,
  MoreThanOrEqual,
  LessThanOrEqual,
  Between,
  In,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UserQueryDto } from './dto/query.dto';
import { CustomError } from '@/common/response/custom-error';
import { PageInfo } from '@/common/dto/pages.dto';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userEntityModel: Repository<UserEntity>;

  /**
   * 查询用户列表
   */
  async list(query: UserQueryDto): Promise<PageInfo<UserEntity>> {
    const pageInfo = new PageInfo<UserEntity>(query.pageNum, query.pageSize);

    const whereValue: FindOptionsWhere<UserEntity> = {};

    // 查询用户id
    if (query.ids?.length > 0) {
      whereValue.id = In(query.ids);
    }
    // 查询用户名
    if (query.username) {
      whereValue.username = Like(`%${query.username}%`);
    }
    // 查询性别
    if (query.gender) {
      whereValue.gender = query.gender;
    }
    // 模糊查询 元信息
    if (query.metadata) {
      whereValue.metadata = Like(`%${query.metadata}%`);
    }
    // 时间区间处理
    if (query.startTime && query.endTime) {
      whereValue.createdAt = Between(query.startTime, query.endTime);
    } else {
      if (query.startTime) {
        whereValue.createdAt = MoreThanOrEqual(query.startTime);
      }
      if (query.endTime) {
        whereValue.createdAt = LessThanOrEqual(query.endTime);
      }
    }

    const [records, total] = await this.userEntityModel.findAndCount({
      skip: pageInfo.skip,
      take: pageInfo.size,
      where: whereValue,
    });
    pageInfo.total = total;
    pageInfo.records = records;

    return pageInfo;
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
  async details(id: number): Promise<UserEntity> {
    const record = await this.userEntityModel.findOne({
      where: {
        id: id,
      },
    });
    return record;
  }
}
