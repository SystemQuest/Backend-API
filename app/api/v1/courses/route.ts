import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type CourseLanguage = {
  language: {
    id: string
    slug: string
    name: string
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const include = searchParams.get('include')?.split(',') || []
  const status = searchParams.get('status') // 过滤参数：live, beta, alpha
  
  const courses = await prisma.course.findMany({
    where: status ? { releaseStatus: status } : undefined,
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
    orderBy: { createdAt: 'desc' },
  })
  
  // 转换数据格式，展平 languages
  const data = courses.map(course => {
    const { courseLanguages, ...rest } = course
    
    // courseLanguages might be false (when not included) or an array with language relation
    let languages
    if (courseLanguages && Array.isArray(courseLanguages) && courseLanguages.length > 0) {
      languages = (courseLanguages as unknown as CourseLanguage[]).map((cl) => cl.language)
    }
    
    return {
      ...rest,
      languages,
    }
  })
  
  return NextResponse.json({
    data,
    pagination: {
      total: data.length,
      page: 1,
      pageSize: data.length,
      totalPages: 1,
    },
  })
}
