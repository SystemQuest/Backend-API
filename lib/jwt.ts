import { SignJWT, jwtVerify } from 'jose'

export interface TokenPayload {
  version: '1.0'
  userId: string
  repositoryId: string
  courseId: string
  courseSlug: string
  languageId: string
  languageSlug: string
  stageId?: string
  issuer: 'systemquest'
  issuedAt: number
  expiresAt: number
  scopes: string[]
  metadata?: Record<string, unknown>
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-in-production'
)

export async function generateToken(payload: Omit<TokenPayload, 'version' | 'issuer' | 'issuedAt' | 'expiresAt'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const expiresAt = now + 365 * 24 * 60 * 60 // 1 year

  const fullPayload: TokenPayload = {
    version: '1.0',
    issuer: 'systemquest',
    issuedAt: now,
    expiresAt,
    ...payload,
  }

  const token = await new SignJWT(fullPayload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(expiresAt)
    .setIssuer('systemquest')
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'systemquest',
    })

    return payload as unknown as TokenPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
