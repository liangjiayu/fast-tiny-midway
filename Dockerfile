# 基础镜像，设置基础环境
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . /app

# 安装生产依赖
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --ignore-scripts

# 安装开发依赖和构建应用
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

# 最终镜像
FROM base
RUN pnpm add -g pm2

# 复制 运行时 需要的文件
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# 设置时区
RUN apk add tzdata

EXPOSE 7200
CMD [ "pnpm", "prod" ]
