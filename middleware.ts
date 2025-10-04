import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 允许的前端origins列表
const ALLOWED_ORIGINS = [
  'http://localhost:3100', // Express OAuth测试工具
  'http://localhost:5173', // React OAuth测试工具
  process.env.FRONTEND_URL,
].filter(Boolean)

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : (process.env.FRONTEND_URL || '*')

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // 添加 CORS 头到所有响应
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin)
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  
  return response
}

// 配置 middleware 只应用于 API 路由
export const config = {
  matcher: '/api/:path*',
}
