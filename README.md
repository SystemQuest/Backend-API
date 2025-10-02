# SystemQuest APIThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



> Master System Design One Challenge at a Time## Getting Started



Backend API for SystemQuest - A platform for learning system design through hands-on challenges.First, run the development server:



## 🚀 Quick Start```bash

npm run dev

### Prerequisites# or

yarn dev

- Node.js 20+# or

- pnpm 8+pnpm dev

- Docker (for local PostgreSQL)# or

bun dev

### Installation```



```bashOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Install dependencies

pnpm installYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.



# Start local PostgreSQLThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

pnpm docker:up

## Learn More

# Generate Prisma Client

pnpm db:generateTo learn more about Next.js, take a look at the following resources:



# Run database migrations- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

pnpm db:migrate- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



# Seed initial dataYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

pnpm db:seed

## Deploy on Vercel

# Start development server

pnpm devThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Visit http://localhost:3000

### Environment Setup

1. Copy `.env.example` to `.env`
2. Configure your environment variables:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/systemquest?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# GitHub OAuth (create at https://github.com/settings/developers)
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"

# JWT Token Secret
JWT_SECRET="generate-with-openssl-rand-base64-32"

# Encryption Key (32 bytes)
ENCRYPTION_KEY="generate-with-openssl-rand-base64-32"
```

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32

# Generate ENCRYPTION_KEY
openssl rand -base64 32
```

### Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: `SystemQuest (Local)`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

## 📁 Project Structure

```
systemquest-api/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth.js routes
│   │   └── health/              # Health check API
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client singleton
│   ├── jwt.ts                   # JWT token utilities
│   └── github.ts                # GitHub API utilities
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.js                  # Seed data
├── .env                         # Environment variables (git ignored)
├── .env.example                 # Environment template
├── docker-compose.yml           # Local PostgreSQL
└── package.json
```

## 🛠️ Development Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run ESLint

# Database
pnpm db:generate        # Generate Prisma Client
pnpm db:push            # Push schema to database (no migration)
pnpm db:migrate         # Create and run migration
pnpm db:studio          # Open Prisma Studio (GUI)
pnpm db:seed            # Seed initial data

# Docker
pnpm docker:up          # Start PostgreSQL container
pnpm docker:down        # Stop PostgreSQL container
```

## 📊 Database Schema

Key models:

- **User**: User accounts (GitHub OAuth)
- **Account**: NextAuth account connections
- **Session**: User sessions
- **Language**: Programming languages (Go, Python, etc.)
- **Course**: Learning courses (Redis, Docker, etc.)
- **CourseStage**: Individual challenges within courses
- **Repository**: User's GitHub repositories for challenges
- **Submission**: Code submissions and test results
- **CourseStageCompletion**: Completed stages tracking

## 🔐 Authentication

Uses NextAuth.js v5 with:
- GitHub OAuth provider
- Prisma adapter for session storage
- JWT tokens for GitHub Actions callbacks

## 🏗️ Phase 1 Status

✅ Completed:
- [x] Next.js 14 project setup
- [x] Prisma ORM configuration
- [x] PostgreSQL database schema
- [x] NextAuth.js with GitHub OAuth
- [x] JWT token utilities
- [x] GitHub API integration helpers
- [x] Docker Compose for local dev
- [x] Database seed script
- [x] Health check API

📋 Next Steps (Phase 2):
- [ ] Implement Course APIs
- [ ] Implement Repository APIs
- [ ] Create GitHub repository automation
- [ ] Add JWT token generation endpoint

## 📚 Documentation

See `/docs` directory for:
- `backend-api-design.md` - Complete API design
- `database-setup.md` - Database setup guide
- `github-actions-workflow.md` - GitHub Actions templates
- `quick-start.md` - Quick start guide

## 🚢 Deployment

Deploy to Vercel:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Configure environment variables in Vercel dashboard.

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

---

**SystemQuest** - Master System Design One Challenge at a Time  
https://systemquest.dev
