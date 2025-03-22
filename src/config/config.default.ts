import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1740806677164_4665',
  koa: {
    port: process.env.APP_PORT || 7200,
  },
  /**
   * 数据库配置
   * @See https://midwayjs.org/docs/extensions/orm
   */
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
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
  /**
   * swagger-ui 配置
   * @See https://midwayjs.org/docs/extensions/swagger
   */
  swagger: {
    title: 'Fast-Tiny-Api',
    description: 'This is a swagger-ui for Fast-Tiny-Api project',
    displayOptions: {
      // 根据接口的类型排序
      operationsSorter: (a: any, b: any) => {
        const methodOrder = ['post', 'put', 'get', 'delete'];
        const methodA = a._root.entries[1][1].toLowerCase(); // 获取接口的具体的 method类型（a）
        const methodB = b._root.entries[1][1].toLowerCase(); // 获取接口的具体的 method类型（b）
        return methodOrder.indexOf(methodA) - methodOrder.indexOf(methodB);
      },
    },
  },
  /**
   * 参数验证 配置
   * @See https://midwayjs.org/docs/extensions/validate
   */
  validate: {
    validationOptions: {
      allowUnknown: true,
    },
  },
} as MidwayConfig;
