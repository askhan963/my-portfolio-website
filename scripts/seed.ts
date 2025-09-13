import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import bcrypt from 'bcryptjs'

// Load environment variables from .env.local
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@askhan.com' },
    update: {},
    create: {
      email: 'admin@askhan.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', adminUser)

  // Seed projects from your existing data
  const projects = [
    {
      title: "VR MathQuest Adventures (FYP)",
      description: "VR MathQuest Adventures is an innovative Virtual Reality application designed to enhance learning through immersive interactive environments. Developed as part of a capstone project, this application leverages the power of VR to teach basic arithmetic concepts to children via engaging games like Basket-Hop and Bow & Arrow. By integrating real-time interaction and feedback, the app ensures that learners not only grasp but also retain mathematical principles more effectively.",
      techStack: ["Unity", "OpenXR", "C#"],
      awards: ["Received an Appreciation Award at COMPEC NUST 2024"],
      images: [
        "/Projects/math-quest/1.png",
        "/Projects/math-quest/2.png",
        "/Projects/math-quest/3.png",
        "/Projects/math-quest/4.png",
        "/Projects/math-quest/5.png",
        "/Projects/math-quest/6.png",
        "/Projects/math-quest/7.png",
      ],
      category: "Computer Science",
    },
    {
      title: "BookShelfX",
      description: "BookShelfX is a dynamic web application for managing a collection of books. It provides a seamless experience for users to browse, add, and manage books in their library.",
      techStack: ["React", "Tailwind CSS", "Redux Toolkit", "Node.js", "MongoDB", "Firebase"],
      githubLink: "https://github.com/askhan963/bookShelfX",
      liveLink: "https://bookshelfx.netlify.app",
      images: [
        "/Projects/bookshelfx/1.png",
        "/Projects/bookshelfx/2.png",
        "/Projects/bookshelfx/3.png",
        "/Projects/bookshelfx/4.png",
        "/Projects/bookshelfx/5.png",
        "/Projects/bookshelfx/6.png",
        "/Projects/bookshelfx/7.png",
        "/Projects/bookshelfx/8.png",
        "/Projects/bookshelfx/9.png",
        "/Projects/bookshelfx/10.png",
        "/Projects/bookshelfx/11.png",
      ],
      category: "MERN Stack",
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: project,
      create: project,
    })
  }

  // Seed honors
  const honors = [
    {
      title: "Relational Database",
      description: "freeCodeCamp",
      image: "/Awards/freeCodeCamp.png",
      issuedBy: "freeCodeCamp",
      issuedAt: new Date("2023-01-01"),
    },
    {
      title: "Global Top 100 Finalist GDSC Solution Challenge 2024",
      description: "Google Developer Student Clubs",
      image: "/Awards/googleTop100.png",
      issuedBy: "Google Developer Student Clubs",
      issuedAt: new Date("2024-01-01"),
    },
  ]

  for (const honor of honors) {
    await prisma.honor.upsert({
      where: { title: honor.title },
      update: honor,
      create: honor,
    })
  }

  // Seed experiences
  const experiences = [
    {
      company: "Tech Avenue Pvt Ltd",
      companyLink: "https://techavenue.biz/",
      logo: "/Logos/tech-avenue.jpeg",
      period: "Jan 2024 – Present | Onsite",
      roles: [
        {
          title: "Software Engineer",
          period: "April 2024 – Present",
          description: [
            "Promoted from Senior Associate to Software Engineer in recognition of consistent performance and delivery.",
            "Leading complex full-stack development projects using the MERN stack with a focus on scalability and maintainability.",
            "Mentoring junior developers and reviewing code to ensure adherence to best practices.",
            "Contributing to architectural decisions and long-term technical planning with cross-functional teams.",
          ],
        },
        {
          title: "Senior Associate Software Engineer",
          period: "January 2024 – March 2024",
          description: [
            "Developed and maintained full-stack web applications using the MERN stack, ensuring robust performance and scalability.",
            "Built dynamic mobile applications with React Native, delivering high-quality user experiences across both iOS and Android platforms.",
            "Implemented state management using Redux and RTK to streamline data flow and enhance performance.",
            "Collaborated with cross-functional teams to design and deliver modern, interactive user interfaces.",
          ],
        },
      ],
    },
  ]

  for (const exp of experiences) {
    const experience = await prisma.experience.upsert({
      where: { company: exp.company },
      update: {
        company: exp.company,
        companyLink: exp.companyLink,
        logo: exp.logo,
        period: exp.period,
      },
      create: {
        company: exp.company,
        companyLink: exp.companyLink,
        logo: exp.logo,
        period: exp.period,
      },
    })

    // Create roles for this experience
    for (const role of exp.roles) {
      await prisma.experienceRole.create({
        data: {
          title: role.title,
          period: role.period,
          description: role.description,
          experienceId: experience.id,
        },
      })
    }
  }

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
