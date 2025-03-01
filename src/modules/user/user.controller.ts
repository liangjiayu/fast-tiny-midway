import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from './user.service';

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
}
