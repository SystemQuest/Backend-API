import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const include = searchParams.get('include')?.split(',') || []
  
  const courses = await prisma.course.findMany({
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
    const { courseLanguages, ...rest } = course as any
    return {
      ...rest,
      languages: courseLanguages?.map((cl: any) => cl.language) || undefined,
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
