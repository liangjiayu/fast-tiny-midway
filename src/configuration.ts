import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import * as orm from '@midwayjs/typeorm';
import * as swagger from '@midwayjs/swagger';
import { FormatMiddleware } from './middleware/format.middleware';
import { CustomErrorFilter } from './filter/custom.filter';

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    swagger,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([FormatMiddleware]);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      ValidateErrorFilter,
      CustomErrorFilter,
      DefaultErrorFilter,
    ]);
  }
}
