# SystemQuest API# SystemQuest API# SystemQuest APIThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



> Master System Design One Challenge at a Time



Backend API for [SystemQuest](https://systemquest.dev) - Learn system design through hands-on challenges.> Master System Design One Challenge at a Time



[![Deployment](https://img.shields.io/badge/deployment-live-brightgreen)](https://api.systemquest.dev)

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)[![Deployment Status](https://img.shields.io/badge/deployment-live-brightgreen)](https://api.systemquest.dev)> Master System Design One Challenge at a Time## Getting Started



## 🚀 Quick Start[![Health Check](https://img.shields.io/badge/health-ok-brightgreen)](https://api.systemquest.dev/api/health)



```bash[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)

# Install dependencies

pnpm install[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)



# Start database[![Prisma](https://img.shields.io/badge/Prisma-6.16-2D3748)](https://www.prisma.io/)Backend API for SystemQuest - A platform for learning system design through hands-on challenges.First, run the development server:

pnpm docker:up



# Setup database

pnpm db:generateBackend API for SystemQuest - A platform for learning system design through hands-on challenges.

pnpm db:push

pnpm db:seed



# Start dev server**🌐 Production**: https://api.systemquest.dev  ## 🚀 Quick Start```bash

pnpm dev

```**📊 Health Check**: https://api.systemquest.dev/api/health  



Visit http://localhost:3000/api/health**📦 Repository**: https://github.com/SystemQuest/Backend-APInpm run dev



## 📋 Environment Setup



Copy `.env.example` to `.env` and configure:## 🎯 Project Status### Prerequisites# or



```bash

# Generate secrets

openssl rand -base64 32  # for NEXTAUTH_SECRET, JWT_SECRET, ENCRYPTION_KEY- ✅ **Phase 1 Complete**: Infrastructure setup, authentication, databaseyarn dev



# Setup GitHub OAuth- 🔄 **Phase 2 In Progress**: Core APIs (courses, repositories, submissions)

# Visit: https://github.com/settings/developers

# Callback URL: http://localhost:3000/api/auth/callback/github- 📋 **Phase 3 Planned**: GitHub Actions integration, webhooks- Node.js 20+# or

```



## 📚 What's Inside?

## 🚀 Quick Start- pnpm 8+pnpm dev

- **Languages**: Go, Python, Java

- **Courses**: WebSocket Server, Consistent Hashing, Bloom Filter, Load Balancer

- **Total Stages**: 22 challenges

### Prerequisites- Docker (for local PostgreSQL)# or

## 🛠️ Tech Stack



- **Framework**: Next.js 15 + TypeScript

- **Database**: PostgreSQL + Prisma ORM- Node.js 20+bun dev

- **Auth**: NextAuth.js v5 (GitHub OAuth)

- **Deployment**: Vercel- pnpm 8+



## 📖 Documentation- Docker (for local PostgreSQL)### Installation```



- [`docs/`](docs/) - Setup guides and API design

- [API Health Check](https://api.systemquest.dev/api/health)

### Installation

## 🤝 Contributing



Contributions welcome! Please check existing issues or create a new one.

```bash```bashOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 License

# Clone repository

MIT

git clone https://github.com/SystemQuest/Backend-API.git# Install dependencies

---

cd Backend-API

**SystemQuest** | [Website](https://systemquest.dev) | [API Docs](https://api.systemquest.dev)

pnpm installYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Install dependencies

pnpm install



# Copy environment variables# Start local PostgreSQLThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

cp .env.example .env

# Edit .env with your configurationpnpm docker:up



# Start local PostgreSQL## Learn More

pnpm docker:up

# Generate Prisma Client

# Generate Prisma Client

pnpm db:generatepnpm db:generateTo learn more about Next.js, take a look at the following resources:



# Run database migrations

pnpm db:push

# Run database migrations- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

# Seed initial data

pnpm db:seedpnpm db:migrate- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



# Start development server

pnpm dev

```# Seed initial dataYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



Visit http://localhost:3000pnpm db:seed



### Environment Setup## Deploy on Vercel



Generate secrets:# Start development server



```bashpnpm devThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Generate NEXTAUTH_SECRET

openssl rand -base64 32```



# Generate JWT_SECRETCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

openssl rand -base64 32

Visit http://localhost:3000

# Generate ENCRYPTION_KEY

openssl rand -base64 32### Environment Setup

```

1. Copy `.env.example` to `.env`

Configure `.env`:2. Configure your environment variables:



```bash```bash

# Database# Database

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/systemquest?schema=public"DATABASE_URL="postgresql://postgres:postgres@localhost:5432/systemquest?schema=public"



# NextAuth.js# NextAuth.js

NEXTAUTH_URL="http://localhost:3000"NEXTAUTH_URL="http://localhost:3000"

NEXTAUTH_SECRET="your-generated-secret"NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"



# GitHub OAuth (create at https://github.com/settings/developers)# GitHub OAuth (create at https://github.com/settings/developers)

GITHUB_ID="your-github-oauth-app-id"GITHUB_ID="your-github-oauth-app-id"

GITHUB_SECRET="your-github-oauth-app-secret"GITHUB_SECRET="your-github-oauth-app-secret"



# JWT Token Secret# JWT Token Secret

JWT_SECRET="your-generated-secret"JWT_SECRET="generate-with-openssl-rand-base64-32"



# Encryption Key# Encryption Key (32 bytes)

ENCRYPTION_KEY="your-generated-key"ENCRYPTION_KEY="generate-with-openssl-rand-base64-32"

``````



### Create GitHub OAuth App### Generate Secrets



1. Go to https://github.com/settings/developers```bash

2. Click "New OAuth App"# Generate NEXTAUTH_SECRET

3. Fill in:openssl rand -base64 32

   - Application name: `SystemQuest (Local)`

   - Homepage URL: `http://localhost:3000`# Generate JWT_SECRET

   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`openssl rand -base64 32

4. Copy Client ID and Client Secret to `.env`

# Generate ENCRYPTION_KEY

## 📁 Project Structureopenssl rand -base64 32

```

```

systemquest-api/### Create GitHub OAuth App

├── app/

│   ├── api/1. Go to https://github.com/settings/developers

│   │   ├── auth/[...nextauth]/  # NextAuth.js routes2. Click "New OAuth App"

│   │   └── health/              # Health check API3. Fill in:

│   ├── layout.tsx   - Application name: `SystemQuest (Local)`

│   └── page.tsx   - Homepage URL: `http://localhost:3000`

├── lib/   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

│   ├── auth.ts                  # NextAuth configuration4. Copy Client ID and Client Secret to `.env`

│   ├── prisma.ts                # Prisma client singleton

│   ├── jwt.ts                   # JWT token utilities## 📁 Project Structure

│   └── github.ts                # GitHub API utilities

├── prisma/```

│   ├── schema.prisma            # Database schemasystemquest-api/

│   └── seed.js                  # Seed data├── app/

├── docs/│   ├── api/

│   ├── backend-api-design.md    # Complete API design│   │   ├── auth/[...nextauth]/  # NextAuth.js routes

│   ├── database-setup.md        # Database setup guide│   │   └── health/              # Health check API

│   ├── github-actions-workflow.md│   ├── layout.tsx

│   ├── vercel-deployment.md     # Vercel deployment guide│   └── page.tsx

│   └── deployment-status.md     # Current deployment status├── lib/

├── scripts/│   ├── auth.ts                  # NextAuth configuration

│   └── check-db.js              # Database verification│   ├── prisma.ts                # Prisma client singleton

├── .env                         # Environment variables (git ignored)│   ├── jwt.ts                   # JWT token utilities

├── .env.example                 # Environment template│   └── github.ts                # GitHub API utilities

├── docker-compose.yml           # Local PostgreSQL├── prisma/

└── package.json│   ├── schema.prisma            # Database schema

```│   └── seed.js                  # Seed data

├── .env                         # Environment variables (git ignored)

## 🛠️ Development Commands├── .env.example                 # Environment template

├── docker-compose.yml           # Local PostgreSQL

```bash└── package.json

# Development```

pnpm dev                 # Start dev server

pnpm build              # Build for production## 🛠️ Development Commands

pnpm start              # Start production server

pnpm lint               # Run ESLint```bash

# Development

# Databasepnpm dev                 # Start dev server

pnpm db:generate        # Generate Prisma Clientpnpm build              # Build for production

pnpm db:push            # Push schema to databasepnpm start              # Start production server

pnpm db:migrate         # Create and run migrationpnpm lint               # Run ESLint

pnpm db:studio          # Open Prisma Studio (GUI)

pnpm db:seed            # Seed initial data# Database

pnpm db:generate        # Generate Prisma Client

# Dockerpnpm db:push            # Push schema to database (no migration)

pnpm docker:up          # Start PostgreSQL containerpnpm db:migrate         # Create and run migration

pnpm docker:down        # Stop PostgreSQL containerpnpm db:studio          # Open Prisma Studio (GUI)

```pnpm db:seed            # Seed initial data



## 📊 Database Schema# Docker

pnpm docker:up          # Start PostgreSQL container

**10 Core Models:**pnpm docker:down        # Stop PostgreSQL container

```

- **User**: User accounts (GitHub OAuth)

- **Account**: NextAuth account connections## 📊 Database Schema

- **Session**: User sessions

- **VerificationToken**: Email/auth verificationKey models:

- **Language**: Programming languages (Go, Python, Java)

- **Course**: Learning courses- **User**: User accounts (GitHub OAuth)

- **CourseStage**: Individual challenges within courses- **Account**: NextAuth account connections

- **Repository**: User's GitHub repositories- **Session**: User sessions

- **Submission**: Code submissions and test results- **Language**: Programming languages (Go, Python, etc.)

- **CourseStageCompletion**: Completed stages tracking- **Course**: Learning courses (Redis, Docker, etc.)

- **CourseStage**: Individual challenges within courses

## 📚 Initial Data- **Repository**: User's GitHub repositories for challenges

- **Submission**: Code submissions and test results

### Languages (3)- **CourseStageCompletion**: Completed stages tracking

- Go

- Python## 🔐 Authentication

- Java

Uses NextAuth.js v5 with:

### Courses (4)- GitHub OAuth provider

- Prisma adapter for session storage

1. **Build Your Own WebSocket Server** (6 stages)- JWT tokens for GitHub Actions callbacks

   - TCP Server Setup → HTTP Upgrade → Frame Parsing → Echo → Broadcast → Control Frames

## 🏗️ Phase 1 Status

2. **Build Your Own Consistent Hashing** (5 stages)

   - Hash Ring → Key Distribution → Virtual Nodes → Node Lifecycle → Replication✅ Completed:

- [x] Next.js 14 project setup

3. **Build Your Own Bloom Filter** (5 stages)- [x] Prisma ORM configuration

   - Bit Array → Hash Functions → Add/Check → False Positive → Optimal Parameters- [x] PostgreSQL database schema

- [x] NextAuth.js with GitHub OAuth

4. **Build Your Own Load Balancer** (6 stages)- [x] JWT token utilities

   - HTTP Proxy → Round Robin → Health Checks → Least Connections → Weighted → Sticky Sessions- [x] GitHub API integration helpers

- [x] Docker Compose for local dev

**Total**: 22 challenge stages- [x] Database seed script

- [x] Health check API

## 🔐 Authentication

📋 Next Steps (Phase 2):

- **NextAuth.js v5** with GitHub OAuth- [ ] Implement Course APIs

- **Prisma Adapter** for session storage- [ ] Implement Repository APIs

- **JWT Tokens** for GitHub Actions callbacks- [ ] Create GitHub repository automation

- **Encrypted Token Storage** (AES-256-GCM)- [ ] Add JWT token generation endpoint



## 🌐 API Endpoints## 📚 Documentation



### Current (Phase 1)See `/docs` directory for:

- `backend-api-design.md` - Complete API design

| Endpoint | Method | Status | Description |- `database-setup.md` - Database setup guide

|----------|--------|--------|-------------|- `github-actions-workflow.md` - GitHub Actions templates

| `/api/health` | GET | ✅ | Health check |- `quick-start.md` - Quick start guide

| `/api/auth/signin` | GET | ✅ | Sign in page |

| `/api/auth/callback/github` | GET | ✅ | GitHub OAuth callback |## 🚢 Deployment

| `/api/auth/session` | GET | ✅ | Get current session |

Deploy to Vercel:

### Planned (Phase 2)

```bash

| Endpoint | Method | Description |# Install Vercel CLI

|----------|--------|-------------|pnpm add -g vercel

| `/api/v1/courses` | GET | List all courses |

| `/api/v1/courses/:slug` | GET | Get course details |# Deploy

| `/api/v1/courses/:slug/stages` | GET | Get course stages |vercel

| `/api/v1/languages` | GET | List supported languages |```

| `/api/v1/repositories` | POST | Create GitHub repository |

| `/api/v1/repositories/:id` | GET | Get repository info |Configure environment variables in Vercel dashboard.

| `/api/v1/me/repositories` | GET | Get user's repositories |

| `/api/v1/me` | GET | Get current user |## 📝 License

| `/api/v1/me/progress` | GET | Get user progress |

MIT

### Planned (Phase 3)

## 🤝 Contributing

| Endpoint | Method | Description |

|----------|--------|-------------|Contributions welcome! Please read CONTRIBUTING.md first.

| `/api/v1/webhooks/test-results` | POST | Receive GitHub Actions results |

| `/api/v1/submissions` | GET | List submissions |---

| `/api/v1/submissions/:id` | GET | Get submission details |

**SystemQuest** - Master System Design One Challenge at a Time  

## 🚢 Deploymenthttps://systemquest.dev


### Vercel (Production)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Production URL**: https://api.systemquest.dev

### Environment Variables (Vercel)

Configure in Vercel Dashboard → Settings → Environment Variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - `https://api.systemquest.dev`
- `NEXTAUTH_SECRET` - Generated secret
- `GITHUB_ID` - GitHub OAuth App ID
- `GITHUB_SECRET` - GitHub OAuth Secret
- `JWT_SECRET` - Generated secret
- `ENCRYPTION_KEY` - Generated key

See [`docs/vercel-deployment.md`](docs/vercel-deployment.md) for detailed guide.

## 📖 Documentation

- [**API Design**](docs/backend-api-design.md) - Complete API specification
- [**Database Setup**](docs/database-setup.md) - Database configuration guide
- [**GitHub Actions**](docs/github-actions-workflow.md) - Workflow templates
- [**Vercel Deployment**](docs/vercel-deployment.md) - Deployment guide
- [**Deployment Status**](docs/deployment-status.md) - Current status

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Frontend (React)            │
│      (Separate Repository)          │
└────────────┬────────────────────────┘
             │ REST API
             ↓
┌─────────────────────────────────────┐
│    Backend (Next.js 14 App Router)  │
│  ┌─────────────┐  ┌──────────────┐  │
│  │  NextAuth   │  │  Prisma ORM  │  │
│  │  (GitHub)   │  │  (TypeScript)│  │
│  └─────────────┘  └──────────────┘  │
│         ↓                  ↓         │
│    Vercel Edge        PostgreSQL    │
│    (Serverless)      (阿里云 RDS)   │
└─────────────────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│      GitHub (User Repositories)     │
│  ┌─────────────────────────────┐    │
│  │   GitHub Actions Workflow   │    │
│  │   (Automated Testing)       │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

## 🎯 Roadmap

### ✅ Phase 1: Infrastructure (Week 1) - **COMPLETE**
- [x] Next.js setup with TypeScript
- [x] Prisma ORM + PostgreSQL
- [x] NextAuth.js + GitHub OAuth
- [x] JWT token service
- [x] GitHub API integration
- [x] Database schema & seed
- [x] Health check API
- [x] Vercel deployment

### 🔄 Phase 2: Core APIs (Week 2-3) - **IN PROGRESS**
- [ ] Course APIs
- [ ] Language APIs
- [ ] Repository APIs
- [ ] User APIs
- [ ] Progress tracking

### 📋 Phase 3: GitHub Integration (Week 4)
- [ ] GitHub Actions workflows
- [ ] Webhook receiver
- [ ] Submission processing
- [ ] Stage unlocking

### 📋 Phase 4: Advanced Features (Week 5)
- [ ] Leaderboards
- [ ] User profiles
- [ ] Search functionality
- [ ] Analytics

### 📋 Phase 5: Optimization (Week 6)
- [ ] Redis caching (Vercel KV)
- [ ] Error monitoring (Sentry)
- [ ] API rate limiting
- [ ] Performance optimization

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

This project is inspired by [CodeCrafters.io](https://codecrafters.io), but focuses on system design challenges with different course content.

---

**SystemQuest** - Master System Design One Challenge at a Time  
https://systemquest.dev

**Made with** ❤️ **by the SystemQuest Team**
