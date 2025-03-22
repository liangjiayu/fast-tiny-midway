import { wrapResponse } from '@/common/response/wrap-response';
import { zodValidate } from '@/common/utils/zod.validate';
import { Body, Controller, Del, Get, Inject, Param, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@midwayjs/swagger';
import { UserQueryDto } from './dto/query.dto';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserUpdateSchema } from './user.validate';

@ApiTags('sys-users-tag')
@Controller('/api/sys_users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/create')
  @ApiOperation({ summary: '创建用户,返回用户id' })
  @ApiOkResponse({
    type: wrapResponse({ type: Number }),
  })
  async create(@Body() body: UserCreateDto) {
    const result = await this.userService.create(body);
    return result;
  }

  @Get('/list')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({
    type: wrapResponse({ type: UserEntity, struct: 'Page' }),
  })
  async list(@Query() query: UserQueryDto) {
    const records = await this.userService.list(query);
    return records;
  }

  @Post('/update/:id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  @ApiOkResponse({
    type: wrapResponse({ type: Boolean }),
  })
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    zodValidate(UserUpdateSchema, body);
    const result = await this.userService.update(id, body);
    return result;
  }

  @Del('/delete/:id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id', type: Number })
  @ApiOkResponse({
    type: wrapResponse({ type: Boolean }),
  })
  async delete(@Param('id') id: number) {
    const result = await this.userService.delete(id);
    return result;
  }

  @Get('/:id')
  @ApiOperation({ summary: '获取用户详情' })
  @ApiParam({ name: 'id', description: '用户id', type: Number })
  @ApiOkResponse({
    type: wrapResponse({ type: UserEntity }),
  })
  async details(@Param('id') id: number) {
    const result = await this.userService.details(id);
    return result;
  }
}
