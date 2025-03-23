import { PageInfo } from '@/common/dto/pages.dto';
import { CustomError } from '@/common/response/custom-error';
import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import {
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DemoArticleEntity } from './demo-article.entity';

@Provide()
export class DemoArticleService {
  @InjectEntityModel(DemoArticleEntity)
  baseEntityModel: Repository<DemoArticleEntity>;

  /**
   * 查询列表
   */
  async list(): Promise<PageInfo<DemoArticleEntity>> {
    const pageInfo = new PageInfo<DemoArticleEntity>(1, 10);

    const whereValue: FindOptionsWhere<DemoArticleEntity> = {};

    const [records, total] = await this.baseEntityModel.findAndCount({
      skip: pageInfo.skip,
      take: pageInfo.size,
      where: whereValue,
    });
    pageInfo.total = total;
    pageInfo.records = records;

    return pageInfo;
  }

  /**
   * 创建数据
   */
  async create(): Promise<number> {
    const record = new DemoArticleEntity();

    await this.baseEntityModel.save(record);
    return record.id;
  }

  /**
   * 更新数据
   */
  async update(id: number): Promise<boolean> {
    const record = await this.baseEntityModel.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      throw new CustomError('数据不存在!');
    }

    this.baseEntityModel.merge(record);

    const result = await this.baseEntityModel.save(record);
    return !!result;
  }

  /**
   * 删除数据
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.baseEntityModel.softDelete(id);
    if (result?.affected === 0) {
      throw new CustomError('数据不存在!');
    }
    return true;
  }

  /**
   * 查询详情
   */
  async details(id: number): Promise<DemoArticleEntity> {
    const record = await this.baseEntityModel.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      throw new CustomError('数据不存在!');
    }
    return record;
  }
}
