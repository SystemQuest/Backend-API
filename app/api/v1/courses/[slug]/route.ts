import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url)
  const include = searchParams.get('include')?.split(',') || []
  
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      stages: include.includes('stages') ? {
        orderBy: { position: 'asc' },
      } : false,
      courseLanguages: include.includes('languages') ? {
        include: {
          language: true,
        },
      } : false,
    },
  })
  
  if (!course) {
    return NextResponse.json(
      { error: { code: 'RESOURCE_NOT_FOUND', message: 'Course not found' } },
      { status: 404 }
    )
  }
  
  // 转换数据格式，展平 languages
  const { courseLanguages, ...rest } = course as any
  const data = {
    ...rest,
    languages: courseLanguages?.map((cl: any) => cl.language) || undefined,
  }
  
  return NextResponse.json(data)
}
