import { join } from 'node:path';
import { App, Configuration, ILogger, Logger } from '@midwayjs/core';
import * as info from '@midwayjs/info';
import * as koa from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as validate from '@midwayjs/validate';
import { CustomErrorFilter } from './filter/custom.filter';
import { DefaultErrorFilter } from './filter/default.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { FormatMiddleware } from './middleware/format.middleware';

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

  @Logger()
  logger: ILogger;

  async onReady() {
    console.log(this.app.getEnv());
    console.log(process.env.HOME);

    this.logger.warn(`Application Environment: ${this.app.getEnv()}`);
    // add middleware
    this.app.useMiddleware([FormatMiddleware]);
    // add filter
    this.app.useFilter([
      ValidateErrorFilter,
      CustomErrorFilter,
      DefaultErrorFilter,
    ]);
  }
}
