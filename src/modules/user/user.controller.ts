import { Inject, Controller, Get, Post, Body, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';

@Controller('/api/sys_users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/list')
  async list() {
    return this.userService.list();
  }

  @Post('/create')
  async create(@Body() body: UserCreateDto) {
    return await this.userService.create(body);
  }

  @Post('/update/:id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return await this.userService.update(id, body);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @Get('/:id')
  async details(@Param('id') id: number) {
    return await this.userService.details(id);
  }
}
