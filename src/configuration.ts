import { join } from 'node:path';
import { App, Configuration, ILogger, Logger } from '@midwayjs/core';
import * as info from '@midwayjs/info';
import * as koa from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as orm from '@midwayjs/typeorm';
import * as validate from '@midwayjs/validate';
import * as dotenv from 'dotenv';
import { CustomErrorFilter } from './filter/custom.filter';
import { DefaultErrorFilter } from './filter/default.filter';
import { ValidateErrorFilter } from './filter/validate.filter';
import { FormatMiddleware } from './middleware/format.middleware';

// 生产环境加载 .env 配置
if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

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
    console.warn('\x1B[36m%s\x1B[0m', `项目启动成功，运行环境为：${this.app.getEnv()}`);

    if (process.env.APP_NAME) {
      console.warn('\x1B[36m%s\x1B[0m', `环境配置加载 .env 成功：${process.env.APP_NAME}`);
    }

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
