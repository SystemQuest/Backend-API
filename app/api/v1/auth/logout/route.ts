import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // 简单的登出实现：前端删除 Token 即可
  // 如果需要 Token 黑名单，可以在这里添加到数据库
  
  return NextResponse.json({
    message: 'Logged out successfully',
  })
}
