# 基础镜像，设置基础环境
FROM node:22-alpine AS base

# 安装 pnpm 包管理工具
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm add -g pm2

# 添加工作区文件
WORKDIR /app
COPY . /app

# 安装生产依赖
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts --frozen-lockfile

# 安装开发依赖和构建应用
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --ignore-scripts --frozen-lockfile
RUN pnpm run build

# 最终镜像
FROM base

# 复制 运行时 需要的文件
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# 设置时区
RUN apk add tzdata

EXPOSE 7200
CMD [ "pnpm", "start:server" ]
