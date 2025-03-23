import { wrapResponse } from '@/common/response/wrap-response';
import { Controller, Del, Get, Inject, Param, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiOkResponse, ApiOperation, ApiTags } from '@midwayjs/swagger';
import { DemoArticleEntity } from './demo-article.entity';
import { DemoArticleService } from './demo-article.service';

@ApiTags('demo-article-tag')
@Controller('/api/demo-article')
export class DemoArticleController {
  @Inject()
  ctx: Context;

  @Inject()
  baseService: DemoArticleService;

  @Post('/create')
  @ApiOperation({ summary: '创建数据' })
  @ApiOkResponse({
    type: wrapResponse({ type: Number }),
  })
  async create() {
    const result = await this.baseService.create();
    return result;
  }

  @Get('/list')
  @ApiOperation({ summary: '查询列表' })
  @ApiOkResponse({
    type: wrapResponse({ type: DemoArticleEntity, struct: 'Page' }),
  })
  async list() {
    const records = await this.baseService.list();
    return records;
  }

  @Post('/update/:id')
  @ApiOperation({ summary: '更新数据' })
  @ApiOkResponse({
    type: wrapResponse({ type: Boolean }),
  })
  async update(@Param('id') id: number) {
    const result = await this.baseService.update(id);
    return result;
  }

  @Del('/delete/:id')
  @ApiOperation({ summary: '删除数据' })
  @ApiOkResponse({
    type: wrapResponse({ type: Boolean }),
  })
  async delete(@Param('id') id: number) {
    const result = await this.baseService.delete(id);
    return result;
  }

  @Get('/:id')
  @ApiOperation({ summary: '获取详情' })
  @ApiOkResponse({
    type: wrapResponse({ type: DemoArticleEntity }),
  })
  async details(@Param('id') id: number) {
    const result = await this.baseService.details(id);
    return result;
  }
}
