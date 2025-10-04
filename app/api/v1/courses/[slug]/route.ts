import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type CourseLanguage = {
  language: {
    id: string
    slug: string
    name: string
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const { searchParams } = new URL(req.url)
  const include = searchParams.get('include')?.split(',') || []
  
  const course = await prisma.course.findUnique({
    where: { slug },
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
  const { courseLanguages, ...rest } = course
  
  // courseLanguages might be false (when not included) or an array with language relation
  let languages
  if (courseLanguages && Array.isArray(courseLanguages) && courseLanguages.length > 0) {
    languages = (courseLanguages as unknown as CourseLanguage[]).map((cl) => cl.language)
  }
  
  const data = {
    ...rest,
    languages,
  }
  
  return NextResponse.json(data)
}
