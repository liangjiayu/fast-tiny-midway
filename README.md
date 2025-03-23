# fast-tiny-midway

## 简介
- 一个基于 MidwayJS 的轻量级全栈快速开发模板，聚焦于快速搭建中小型 Node.js 服务端应用。
- 内置统一响应体、参数检验、错误处理等常用功能，开箱即用。
- 项目通过规范目录结构，TypeScript + ESLint，确保代码质量，提高可维护性。
- 项目通过 Docker 容器化部署，确保环境一致性，降低部署成本。

## 项目展示

## 技术选型
|   名称   |           说明            |
| :------: | :-----------------------: |
| 核心框架 | MidwayJS 3.0 + TypeScript |
|   ORM    | TypeORM（默认使用MySQL）  |
| API 文档 |        Swagger UI         |
| 代码质量 |      ESLint + Husky       |
| 代码生成 |     Plop + Handlebars     |
| 项目部署 |  Docker + Github-Actions  |

## 项目结构

### 根目录文件（重要文件）
|        名称         |            说明             |
| :-----------------: | :-------------------------: |
|        .env         |      环境变量配置文件       |
|     Dockerfile      |    Docker 容器化构建文件    |
| docker-compose.yml  |    Docker 多容器编排配置    |
| ecosystem.config.js |   PM2 进程管理器配置文件    |
|   plop-templates/   |       代码生成器模板        |
|  eslint.config.mjs  |     ESLint 代码规范配置     |
|    bootstrap.js     |      应用启动入口文件       |
| .github/workflows/  | GitHub Actions 持续集成配置 |

### 核心代码目录
```bash
src/
├── common/                 # 公共模块
│   ├── dto/               # 数据传输对象定义
│   ├── response/          # 统一响应格式处理
│   └── utils/             # 通用工具函数
├── config/                # 环境配置
│   ├── config.*.ts        # 多环境配置文件
├── constants/             # 常量定义
├── controller/            # 路由控制器层
├── filter/                # 异常过滤器
├── middleware/            # 自定义中间件
└── modules/               # 业务模块
    ├── demo-article/      # 示例文章模块
    └── user/              # 用户模块
        ├── dto/           # 用户相关DTO
        ├── entity/        # 数据库实体
        └── *.validate.ts  # 自定义验证逻辑
```

### 模块化开发规范
1. 分层结构
```bash
module/
├── [module].controller.ts  # 请求处理层
├── [module].entity.ts   # 数据库实体层
└── [module].service.ts     # 业务逻辑层
```

2. DTO 规范
   - *.dto.ts 文件存放接口入参校验定义
   - 使用 joi注解 或 zod函数 定义校验规则

3. 异常处理
   - filter/ 目录包含全局异常处理器
   - custom-error.ts 实现自定义错误类型

### 环境配置策略
|     配置文件      |   说明   |
| :---------------: | :------: |
| config.default.ts | 所有环境 |
|  config.local.ts  | 本地开发 |
|  config.prod.ts   | 生产环境 |
|  config.daily.ts  | 日常环境 |

## 本地开发

### 环境准备
|      名称      | 版本要求 |
| :------------: | :------: |
|    Node.js     |  >=22.0  |
|      pnpm      |  >=10.0  |
|     MySQL      |  >=8.0   |
| Docker（可选） |  >=26.0  |
|  PM2（可选）   |  >=5.0   |

### 快速启动
```bash
# 1. 克隆项目
git clone https://github.com/your-project/fast-tiny-midway.git
cd fast-tiny-midway

# 2. 安装依赖（使用 pnpm）
pnpm install

# 3. 启动开发服务
pnpm run dev

# 4. 访问接口文档
open http://localhost:7200/swagger-ui
```

### 常用开发命令
```json
{
  // 开发
  "dev": "启动开发模式，热更新",

  // 质量
  "lint": "静态代码检查",
  "lint:fix": "自动修复代码规范问题",

  // 构建
  "build": "生产环境构建",

  // 服务器启动
  "start": "生产环境启动",
  "start:serve": "Docker 容器环境启动服务",

  // PM2
  "pm2:start": "[PM2] 常规启动",
  "pm2:stop": "[PM2] 停止服务",

  // Docker
  "docker:build": "[Docker] 镜像构建",
  "docker:up": "[Docker] 启动服务",
  "docker:down": "[Docker] 停止服务",

  // 其他
  "plop": "生成代码模板"
}
```

### 模块开发示例
```bash
# 使用 plop命令一键生成模块雏形
pnpm plop

? 请输入模块名称(英文名称,如 product-info ): product
⠋ 请注意默认生成的实体类，默认字段有id、created_at、updated_at、deleted_at，请确认 product 表是否包含这些字段，否则请手动修改实体类！
✔  ++ /src/modules/product/product.controller.ts
✔  ++ /src/modules/product/product.entity.ts
✔  ++ /src/modules/product/product.service.ts
```

### 开发最佳实践
1. 代码分层规范
    ```bash
    module/
    ├── [module].controller.ts  # 请求处理层
    ├── [module].entity.ts   # 数据库实体层
    └── [module].service.ts     # 业务逻辑层
    ```
2. 统一响应格式
3. 错误处理
   ```typescript
   // 使用 CustomError 抛出业务异常
   throw new CustomError('数据不存在');
   ```

## 一键部署

## 其他说明
