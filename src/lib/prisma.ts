import { PrismaClient } from "@prisma/client"
//import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// Maybe need this later? but I don't think MongoDB and Prisma need adapter
// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// })

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Anytime we want to use Prisma to fetch or insert data from database, we will be using this export:
export default prisma