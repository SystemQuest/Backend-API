import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars'
)

export interface AccessTokenPayload extends JWTPayload {
  userId: string
  email: string
  username: string
  type: 'access'
}

export interface RefreshTokenPayload extends JWTPayload {
  userId: string
  type: 'refresh'
}

export async function generateAccessToken(payload: {
  userId: string
  email: string
  username: string
}): Promise<string> {
  const token = await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    username: payload.username,
    type: 'access',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .setIssuer('systemquest')
    .sign(JWT_SECRET)

  return token
}

export async function generateRefreshToken(payload: {
  userId: string
}): Promise<string> {
  const token = await new SignJWT({
    userId: payload.userId,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .setIssuer('systemquest')
    .sign(JWT_SECRET)

  return token
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'systemquest',
    })

    if (payload.type !== 'access') {
      throw new Error('Invalid token type')
    }

    return payload as AccessTokenPayload
  } catch (error) {
    throw new Error('Invalid or expired access token')
  }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'systemquest',
    })

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type')
    }

    return payload as RefreshTokenPayload
  } catch (error) {
    throw new Error('Invalid or expired refresh token')
  }
}
