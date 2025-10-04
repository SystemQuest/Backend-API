import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // 生成随机 state 用于 CSRF 保护
  const state = Math.random().toString(36).substring(2, 15)
  
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_CALLBACK_URL!,
    scope: 'read:user user:email public_repo',
    state,
  })
  
  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
  
  return NextResponse.json({
    authUrl,
    state,
  })
}
