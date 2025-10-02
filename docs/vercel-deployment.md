# Vercel Deployment Guide

## Prerequisites

1. Vercel account
2. GitHub account with repository access
3. PostgreSQL database (e.g., Aliyun RDS, Supabase, Neon)

## Step 1: Generate Secrets

```bash
# Generate three secrets (32 bytes each)
openssl rand -base64 32  # NEXTAUTH_SECRET
openssl rand -base64 32  # JWT_SECRET
openssl rand -base64 32  # ENCRYPTION_KEY
```

## Step 2: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Configure:
   - **Homepage URL**: `https://your-domain.vercel.app`
   - **Callback URL**: `https://your-domain.vercel.app/api/auth/callback/github`
4. Save the Client ID and Secret

## Step 3: Configure Vercel Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=<generated-secret-1>

# GitHub OAuth
GITHUB_ID=<your-github-client-id>
GITHUB_SECRET=<your-github-client-secret>

# Tokens
JWT_SECRET=<generated-secret-2>
ENCRYPTION_KEY=<generated-secret-3>
```

## Step 4: Deploy

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

## Step 5: Initialize Database

After deployment:

```bash
# Run migrations
vercel env pull .env.production
pnpm db:push

# Seed data
pnpm db:seed
```

## Verify Deployment

Test health check:
```bash
curl https://your-domain.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2025-10-02T15:00:00.000Z"
}
```

## Troubleshooting

### Database Connection Issues
- Check `DATABASE_URL` format
- Ensure `sslmode=require` is included
- Verify database accepts connections from Vercel IPs

### Authentication Issues
- Confirm GitHub OAuth callback URL matches Vercel domain
- Verify `NEXTAUTH_URL` matches deployed URL
- Check `NEXTAUTH_SECRET` is set

### Build Failures
- Review Vercel build logs
- Test build locally: `pnpm build`
- Check TypeScript errors

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env` files with real credentials
- Keep `.env.prod` in `.gitignore`
- Rotate secrets regularly
- Use Vercel's environment variable encryption
