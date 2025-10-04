# SystemQuest API

SystemQuest 后端 API 服务 - 基于 Next.js 14 App Router 构建

## 技术栈

- **Next.js 14** - React 框架 + API Routes
- **Prisma** - ORM 数据库工具
- **PostgreSQL** - 关系型数据库
- **JWT** - 自定义认证系统（Access Token + Refresh Token）
- **GitHub OAuth** - 用户认证
- **TypeScript** - 类型安全

## 功能特性

### ✅ 已实现

- **认证系统**
  - GitHub OAuth 登录
  - JWT Token（Access Token 1小时 + Refresh Token 7天）
  - Token 刷新机制
  - 用户信息管理

- **课程管理**
  - 课程列表查询
  - 课程详情查询
  - 支持关联查询（stages, languages）

- **语言管理**
  - 编程语言列表

- **中间件**
  - CORS 配置
  - 认证中间件（requireAuth, optionalAuth）

### 🚧 待实现

- 仓库管理 API
- 提交和评估 API
- Webhook 集成
- 排行榜 API

## 快速开始

### 1. 环境要求

- Node.js 18+
- pnpm
- PostgreSQL
- Docker（可选）

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

复制 `.env.example` 到 `.env` 并配置：

```bash
cp .env.example .env
```

关键配置项：

```bash
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GITHUB_CALLBACK_URL="http://localhost:3000/api/v1/auth/github/callback"
FRONTEND_URL="http://localhost:3001"
ENCRYPTION_KEY="..." # 用于加密 GitHub tokens
```

### 4. 启动数据库

使用 Docker：

```bash
docker-compose up -d
```

或使用本地 PostgreSQL。

### 5. 初始化数据库

```bash
# 运行迁移
pnpm prisma migrate dev

# 生成 Prisma Client
pnpm prisma generate

# 填充种子数据
pnpm prisma db seed
```

### 6. 启动开发服务器

```bash
pnpm dev
```

API 将运行在 `http://localhost:3000`

## API 文档

### 认证相关

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/v1/auth/github` | 获取 GitHub OAuth URL | ❌ |
| GET | `/api/v1/auth/github/callback` | GitHub OAuth 回调 | ❌ |
| POST | `/api/v1/auth/refresh` | 刷新访问令牌 | ❌ |
| GET | `/api/v1/auth/me` | 获取当前用户 | ✅ |
| POST | `/api/v1/auth/logout` | 登出 | ✅ |

### 课程相关

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/v1/courses` | 课程列表 | ❌ |
| GET | `/api/v1/courses/:slug` | 课程详情 | ❌ |

### 语言相关

| 方法 | 端点 | 说明 | 认证 |
|------|------|------|------|
| GET | `/api/v1/languages` | 语言列表 | ❌ |

## 开发工具

### OAuth 测试工具

我们提供了一个完整的 OAuth 测试工具，用于测试 GitHub OAuth + JWT 完整流程：

```bash
cd tools/oauth-test
pnpm install
pnpm dev
```

详细使用说明请查看 [tools/oauth-test/README.md](./tools/oauth-test/README.md)

### Prisma Studio

可视化查看和编辑数据库：

```bash
pnpm prisma studio
```

## 项目结构

```
systemquest-api/
├── app/
│   └── api/
│       └── v1/
│           ├── auth/              # 认证相关 API
│           ├── courses/           # 课程 API
│           └── languages/         # 语言 API
├── lib/
│   ├── auth.ts                    # 认证中间件
│   ├── jwt.ts                     # JWT 工具函数
│   └── prisma.ts                  # Prisma 客户端
├── prisma/
│   ├── schema.prisma              # 数据库 Schema
│   ├── seed.js                    # 种子数据
│   └── migrations/                # 数据库迁移
├── tools/
│   └── oauth-test/                # OAuth 测试工具
├── middleware.ts                  # Next.js 中间件（CORS）
├── .env                           # 环境变量（本地）
├── .env.example                   # 环境变量模板
└── .env.prod                      # 生产环境变量
```

## 数据库 Schema

主要模型：

- **User** - 用户（GitHub OAuth）
- **Course** - 课程
- **CourseStage** - 课程阶段
- **Language** - 编程语言
- **CourseLanguage** - 课程-语言关系
- **Repository** - 用户仓库
- **Submission** - 提交记录
- **StageCompletion** - 阶段完成记录

## 部署

### Vercel 部署

项目已配置自动部署到 Vercel：

- **API**: https://api.systemquest.dev
- **数据库**: 阿里云 RDS PostgreSQL

### 环境变量配置

在 Vercel 项目设置中配置以下环境变量（参考 `.env.prod`）：

```bash
DATABASE_URL=postgresql://...  # 阿里云 RDS
JWT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=https://api.systemquest.dev/api/v1/auth/github/callback
FRONTEND_URL=https://www.systemquest.dev
ENCRYPTION_KEY=...
```

### 部署后检查

```bash
# 健康检查（待实现）
curl https://api.systemquest.dev/health

# 测试 API
curl https://api.systemquest.dev/api/v1/courses
```

## 开发指南

### 添加新的 API 端点

1. 在 `app/api/v1/` 下创建相应目录
2. 创建 `route.ts` 文件
3. 使用 `requireAuth()` 或 `optionalAuth()` 中间件
4. 更新 API 文档

示例：

```typescript
// app/api/v1/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const authResult = await requireAuth(req)
  if (authResult.error) return authResult.error
  
  // 业务逻辑
  const data = await prisma.example.findMany()
  
  return NextResponse.json(data)
}
```

### 数据库迁移

```bash
# 创建新迁移
pnpm prisma migrate dev --name migration_name

# 应用迁移到生产
pnpm prisma migrate deploy
```

## 测试

### 本地测试

```bash
# 启动 API 服务器
pnpm dev

# 在另一个终端启动测试工具
cd tools/oauth-test
pnpm dev
```

### API 测试工具推荐

- **OAuth 测试工具** - 我们的自定义工具（推荐）
- Postman
- Thunder Client（VS Code 扩展）
- curl

## 故障排查

### 数据库连接失败

1. 检查 PostgreSQL 是否运行：`docker ps`
2. 检查 `DATABASE_URL` 配置
3. 重启数据库容器：`docker-compose restart`

### JWT 验证失败

1. 检查 `JWT_SECRET` 配置
2. 确认 token 未过期
3. 使用测试工具重新获取 token

### GitHub OAuth 失败

1. 检查 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`
2. 确认 GitHub OAuth App 回调 URL 正确
3. 检查 Scope 配置（应该是 `read:user user:email public_repo`）

## 相关文档

- [API 设计文档](./docs/v2/)
- [OAuth 测试工具文档](./tools/oauth-test/README.md)
- [Prisma 文档](https://www.prisma.io/docs)
- [Next.js 文档](https://nextjs.org/docs)

## 许可证

MIT

## 联系方式

- GitHub: [SystemQuest/Backend-API](https://github.com/SystemQuest/Backend-API)
- 问题反馈: [GitHub Issues](https://github.com/SystemQuest/Backend-API/issues)
