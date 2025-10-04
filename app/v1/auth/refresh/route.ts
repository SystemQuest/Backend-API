import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * POST /api/v1/auth/refresh
 * 
 * Refresh access token using refresh token
 * 
 * Request body:
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 * 
 * Response:
 * {
 *   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "expiresIn": 3600
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      )
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken)

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, username: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate new access token
    const accessToken = await generateAccessToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    })

    return NextResponse.json({
      accessToken,
      expiresIn: 3600, // 1 hour
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    
    return NextResponse.json(
      { error: 'Invalid or expired refresh token' },
      { status: 401 }
    )
  }
}
