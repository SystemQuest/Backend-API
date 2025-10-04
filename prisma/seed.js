const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Languages
  const go = await prisma.language.upsert({
    where: { slug: 'go' },
    update: {},
    create: {
      name: 'Go',
      slug: 'go',
    },
  })

  const python = await prisma.language.upsert({
    where: { slug: 'python' },
    update: {},
    create: {
      name: 'Python',
      slug: 'python',
    },
  })

  const java = await prisma.language.upsert({
    where: { slug: 'java' },
    update: {},
    create: {
      name: 'Java',
      slug: 'java',
    },
  })

  console.log('✅ Created languages:', [go, python, java].map(l => l.name).join(', '))

  // Create Courses
  const websocket = await prisma.course.upsert({
    where: { slug: 'websocket-server' },
    update: {},
    create: {
      name: 'Build Your Own WebSocket Server',
      slug: 'websocket-server',
      shortDescription: 'Master real-time communication by building a WebSocket server',
      description: 'Master real-time communication by building a WebSocket server from scratch, implementing the protocol handshake, frame parsing, and bidirectional messaging.',
    },
  })

  const consistentHash = await prisma.course.upsert({
    where: { slug: 'consistent-hash' },
    update: {},
    create: {
      name: 'Build Your Own Consistent Hashing',
      slug: 'consistent-hash',
      shortDescription: 'Learn distributed systems with consistent hashing',
      description: 'Learn distributed system fundamentals by implementing consistent hashing with virtual nodes for load balancing and data partitioning.',
    },
  })

  const bloomFilter = await prisma.course.upsert({
    where: { slug: 'bloom-filter' },
    update: {},
    create: {
      name: 'Build Your Own Bloom Filter',
      slug: 'bloom-filter',
      shortDescription: 'Build a probabilistic data structure for membership testing',
      description: 'Understand probabilistic data structures by building a space-efficient Bloom filter for membership testing with configurable false positive rates.',
    },
  })

  const loadBalancer = await prisma.course.upsert({
    where: { slug: 'load-balancer' },
    update: {},
    create: {
      name: 'Build Your Own Load Balancer',
      slug: 'load-balancer',
      shortDescription: 'Design scalable systems with a Layer 7 load balancer',
      description: 'Design scalable systems by implementing a Layer 7 load balancer with multiple algorithms: round-robin, least connections, and weighted distribution.',
    },
  })

  console.log('✅ Created courses:', [websocket, consistentHash, bloomFilter, loadBalancer].map(c => c.name).join(', '))

  // Create Course Stages for WebSocket Server
  const websocketStages = [
    { name: 'TCP Server Setup', slug: 'tcp-server', description: 'Create a basic TCP server that accepts connections', position: 1, difficultyLevel: 1 },
    { name: 'HTTP Upgrade Handshake', slug: 'http-upgrade', description: 'Implement WebSocket handshake protocol with Sec-WebSocket-Key', position: 2, difficultyLevel: 2 },
    { name: 'Frame Parsing', slug: 'frame-parsing', description: 'Parse WebSocket frames: opcode, mask, and payload', position: 3, difficultyLevel: 3 },
    { name: 'Message Echo', slug: 'message-echo', description: 'Echo text and binary messages back to client', position: 4, difficultyLevel: 2 },
    { name: 'Broadcast Messages', slug: 'broadcast', description: 'Broadcast messages to all connected clients', position: 5, difficultyLevel: 3 },
    { name: 'Ping/Pong & Close', slug: 'control-frames', description: 'Handle control frames: ping, pong, and close', position: 6, difficultyLevel: 3 },
  ]

  for (const stage of websocketStages) {
    await prisma.courseStage.upsert({
      where: {
        courseId_slug: {
          courseId: websocket.id,
          slug: stage.slug,
        },
      },
      update: {},
      create: {
        ...stage,
        courseId: websocket.id,
      },
    })
  }

  console.log(`✅ Created ${websocketStages.length} stages for WebSocket Server course`)

  // Create Course Stages for Consistent Hashing
  const consistentHashStages = [
    { name: 'Basic Hash Ring', slug: 'hash-ring', description: 'Implement a basic hash ring with node placement', position: 1, difficultyLevel: 1 },
    { name: 'Key Distribution', slug: 'key-distribution', description: 'Distribute keys to nodes using hash function', position: 2, difficultyLevel: 2 },
    { name: 'Virtual Nodes', slug: 'virtual-nodes', description: 'Add virtual nodes for better load distribution', position: 3, difficultyLevel: 3 },
    { name: 'Node Add/Remove', slug: 'node-lifecycle', description: 'Handle dynamic node addition and removal', position: 4, difficultyLevel: 3 },
    { name: 'Replication Factor', slug: 'replication', description: 'Implement data replication with N replicas', position: 5, difficultyLevel: 4 },
  ]

  for (const stage of consistentHashStages) {
    await prisma.courseStage.upsert({
      where: {
        courseId_slug: {
          courseId: consistentHash.id,
          slug: stage.slug,
        },
      },
      update: {},
      create: {
        ...stage,
        courseId: consistentHash.id,
      },
    })
  }

  console.log(`✅ Created ${consistentHashStages.length} stages for Consistent Hashing course`)

  // Create Course Stages for Bloom Filter
  const bloomFilterStages = [
    { name: 'Bit Array Setup', slug: 'bit-array', description: 'Create a bit array for storing membership data', position: 1, difficultyLevel: 1 },
    { name: 'Hash Functions', slug: 'hash-functions', description: 'Implement multiple hash functions', position: 2, difficultyLevel: 2 },
    { name: 'Add & Check', slug: 'add-check', description: 'Add elements and check membership', position: 3, difficultyLevel: 2 },
    { name: 'False Positive Rate', slug: 'false-positive', description: 'Calculate and optimize false positive rate', position: 4, difficultyLevel: 3 },
    { name: 'Optimal Parameters', slug: 'optimal-params', description: 'Auto-calculate optimal size and hash count', position: 5, difficultyLevel: 4 },
  ]

  for (const stage of bloomFilterStages) {
    await prisma.courseStage.upsert({
      where: {
        courseId_slug: {
          courseId: bloomFilter.id,
          slug: stage.slug,
        },
      },
      update: {},
      create: {
        ...stage,
        courseId: bloomFilter.id,
      },
    })
  }

  console.log(`✅ Created ${bloomFilterStages.length} stages for Bloom Filter course`)

  // Create Course Stages for Load Balancer
  const loadBalancerStages = [
    { name: 'HTTP Proxy', slug: 'http-proxy', description: 'Create a basic HTTP reverse proxy', position: 1, difficultyLevel: 1 },
    { name: 'Round Robin', slug: 'round-robin', description: 'Implement round-robin load balancing algorithm', position: 2, difficultyLevel: 2 },
    { name: 'Health Checks', slug: 'health-checks', description: 'Add backend health monitoring', position: 3, difficultyLevel: 3 },
    { name: 'Least Connections', slug: 'least-connections', description: 'Implement least connections algorithm', position: 4, difficultyLevel: 3 },
    { name: 'Weighted Distribution', slug: 'weighted', description: 'Add weighted load balancing', position: 5, difficultyLevel: 3 },
    { name: 'Session Persistence', slug: 'sticky-sessions', description: 'Implement sticky sessions with cookies', position: 6, difficultyLevel: 4 },
  ]

  for (const stage of loadBalancerStages) {
    await prisma.courseStage.upsert({
      where: {
        courseId_slug: {
          courseId: loadBalancer.id,
          slug: stage.slug,
        },
      },
      update: {},
      create: {
        ...stage,
        courseId: loadBalancer.id,
      },
    })
  }

  console.log(`✅ Created ${loadBalancerStages.length} stages for Load Balancer course`)

  // Create CourseLanguage relations (supported languages for each course)
  const courseLanguagePairs = [
    // WebSocket Server supports Go, Python, Java
    { courseId: websocket.id, languageId: go.id },
    { courseId: websocket.id, languageId: python.id },
    { courseId: websocket.id, languageId: java.id },
    
    // Consistent Hashing supports Go, Python
    { courseId: consistentHash.id, languageId: go.id },
    { courseId: consistentHash.id, languageId: python.id },
    
    // Bloom Filter supports Go, Python, Java
    { courseId: bloomFilter.id, languageId: go.id },
    { courseId: bloomFilter.id, languageId: python.id },
    { courseId: bloomFilter.id, languageId: java.id },
    
    // Load Balancer supports Go, Python
    { courseId: loadBalancer.id, languageId: go.id },
    { courseId: loadBalancer.id, languageId: python.id },
  ]

  for (const pair of courseLanguagePairs) {
    await prisma.courseLanguage.upsert({
      where: {
        courseId_languageId: {
          courseId: pair.courseId,
          languageId: pair.languageId,
        },
      },
      update: {},
      create: pair,
    })
  }

  console.log(`✅ Created ${courseLanguagePairs.length} course-language relations`)

  // Create test user (using new schema: username + githubId)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@systemquest.dev' },
    update: {},
    create: {
      email: 'test@systemquest.dev',
      name: 'Test User',
      username: 'testuser',
      githubId: '99999999', // Fake GitHub ID for testing
    },
  })

  console.log('✅ Created test user:', testUser.email)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
