import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const languages = await prisma.language.findMany({
    orderBy: { name: 'asc' },
  })
  
  return NextResponse.json({
    data: languages,
  })
}
