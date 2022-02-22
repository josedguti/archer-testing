import { PrismaClient } from "@prisma/client";
const prisma = global.prisma || new PrismaClient();

export default prisma;

if (process.env.VERCEL_ENV === undefined) global.prisma = prisma;
