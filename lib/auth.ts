import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from './jwt'

export async function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authorization header required' } },
        { status: 401 }
      ),
    }
  }
  
  const token = authHeader.substring(7)
  
  try {
    const payload = await verifyAccessToken(token)
    return { user: payload }
  } catch {
    return {
      error: NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' } },
        { status: 401 }
      ),
    }
  }
}

export async function optionalAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null }
  }
  
  const token = authHeader.substring(7)
  
  try {
    const payload = await verifyAccessToken(token)
    return { user: payload }
  } catch {
    return { user: null }
  }
}
