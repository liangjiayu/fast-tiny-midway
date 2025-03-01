import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1740806677164_4665',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456789',
        database: 'fast_tiny_db',
        synchronize: false, // 同步表结构，生产环境建议关闭，数据可能会丢失。
        logging: false,
        // 支持如下的扫描形式，为了兼容我们可以同时进行.js和.ts匹配
        entities: ['**/*.entity.{j,t}s'],
      },
    },
  },
} as MidwayConfig;
