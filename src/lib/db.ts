import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaClass?: typeof PrismaClient;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  return new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });
}

// In development, reuse one client across hot reloads so connections don't pile
// up. But `prisma generate` creates a new PrismaClient class, and a client kept
// from before it doesn't know about new columns ("Unknown argument"), so the
// cached client is only reused while it still comes from the current class.
const cached =
  globalForPrisma.prismaClass === PrismaClient ? globalForPrisma.prisma : null;

if (!cached) void globalForPrisma.prisma?.$disconnect();

export const db = cached ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
  globalForPrisma.prismaClass = PrismaClient;
}
