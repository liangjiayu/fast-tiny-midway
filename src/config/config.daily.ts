import { MidwayConfig } from '@midwayjs/core';

export default {
  /**
   * 数据库配置
   * @See https://midwayjs.org/docs/extensions/orm
   */
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '8.134.97.57',
        port: 3306,
        username: 'fast_tiny_db',
        password: '123456789',
        database: 'fast_tiny_db',
        synchronize: false, // 同步表结构，生产环境建议关闭，数据可能会丢失。
        logging: false,
        // 支持如下的扫描形式，为了兼容我们可以同时进行.js和.ts匹配
        entities: ['**/*.entity.{j,t}s'],
        dateStrings: true, // 时间列返回字符串
      },
    },
  },
} as MidwayConfig;
