const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('📊 Database Statistics:\n')
  
  const languagesCount = await prisma.language.count()
  console.log(`✅ Languages: ${languagesCount}`)
  
  const coursesCount = await prisma.course.count()
  console.log(`✅ Courses: ${coursesCount}`)
  
  const stagesCount = await prisma.courseStage.count()
  console.log(`✅ Course Stages: ${stagesCount}`)
  
  const usersCount = await prisma.user.count()
  console.log(`✅ Users: ${usersCount}`)
  
  console.log('\n📚 Courses Detail:')
  const courses = await prisma.course.findMany({
    include: {
      stages: true,
    },
  })
  
  courses.forEach(course => {
    console.log(`\n  ${course.name}`)
    console.log(`  - Slug: ${course.slug}`)
    console.log(`  - Stages: ${course.stages.length}`)
    course.stages.forEach(stage => {
      console.log(`    ${stage.position}. ${stage.name} (Level ${stage.difficultyLevel})`)
    })
  })
  
  console.log('\n🌍 Languages:')
  const languages = await prisma.language.findMany()
  languages.forEach(lang => {
    console.log(`  - ${lang.name} (${lang.slug})`)
  })
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
