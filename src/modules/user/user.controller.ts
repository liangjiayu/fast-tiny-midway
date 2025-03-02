import { Inject, Controller, Get, Post, Body, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { CommonResult } from '@/common/utils/result.util';

@Controller('/api/sys_users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/list')
  async list() {
    const records = await this.userService.list();
    return CommonResult.success(records);
  }

  @Post('/create')
  async create(@Body() body: UserCreateDto) {
    const result = await this.userService.create(body);
    return CommonResult.success(result);
  }

  @Post('/update/:id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const result = await this.userService.update(id, body);
    return CommonResult.success(result);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id: number) {
    const result = await this.userService.delete(id);
    return CommonResult.success(result);
  }

  @Get('/:id')
  async details(@Param('id') id: number) {
    const result = await this.userService.details(id);
    return CommonResult.success(result);
  }
}
