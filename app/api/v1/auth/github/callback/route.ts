import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'
import { prisma } from '@/lib/prisma'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  
  if (!code || !state) {
    return NextResponse.json(
      { error: { code: 'INVALID_REQUEST', message: 'Missing code or state' } },
      { status: 400 }
    )
  }
  
  try {
    // 1. 用 code 换取 GitHub access_token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
    })
    
    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Failed to get access token')
    }
    
    const githubAccessToken = tokenData.access_token
    
    // 2. 获取 GitHub 用户信息
    const octokit = new Octokit({ auth: githubAccessToken })
    
    const { data: githubUser } = await octokit.users.getAuthenticated()
    const { data: emails } = await octokit.users.listEmailsForAuthenticatedUser()
    
    const primaryEmail = emails.find(e => e.primary)?.email || githubUser.email
    
    if (!primaryEmail) {
      return NextResponse.json(
        { error: { code: 'GITHUB_API_ERROR', message: 'No email found in GitHub account' } },
        { status: 400 }
      )
    }
    
    // 3. 创建或更新用户
    const user = await prisma.user.upsert({
      where: { githubId: String(githubUser.id) },
      update: {
        username: githubUser.login,
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
        avatarUrl: githubUser.avatar_url,
        githubAccessToken, // TODO: 加密存储
        updatedAt: new Date(),
      },
      create: {
        githubId: String(githubUser.id),
        username: githubUser.login,
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
        avatarUrl: githubUser.avatar_url,
        githubAccessToken, // TODO: 加密存储
      },
    })
    
    // 4. 生成 JWT Tokens
    const accessToken = await generateAccessToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    })
    
    const refreshToken = await generateRefreshToken({
      userId: user.id,
    })
    
    // 5. 重定向到前端，带上 Tokens
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const redirectUrl = `${frontendUrl}/auth/callback?access_token=${accessToken}&refresh_token=${refreshToken}`
    
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    const errorUrl = `${frontendUrl}/auth/error?message=${encodeURIComponent('Authentication failed')}`
    
    return NextResponse.redirect(errorUrl)
  }
}
