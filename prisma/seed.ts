import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  education,
  experience,
  profile,
  projects,
  skills,
} from "../src/data/placeholder";

const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DIRECT_URL! }),
});

// Seeding is additive: the profile and projects are upserted, and the other
// collections are only filled when empty, so re-running never clobbers edits
// made later through the admin dashboard.
async function main() {
  await db.profile.upsert({
    where: { id: "profile" },
    update: {},
    create: { id: "profile", ...profile },
  });

  for (const p of projects) {
    const { slug, ...rest } = p;
    await db.project.upsert({
      where: { slug },
      update: {},
      // Covers are local files for now; Cloudinary public IDs arrive in Phase 8.
      create: { slug, ...rest, coverImageId: "" },
    });
  }

  if ((await db.experience.count()) === 0) {
    await db.experience.createMany({
      data: experience.map(({ id: _id, ...e }) => e),
    });
  }
  if ((await db.skill.count()) === 0) {
    await db.skill.createMany({ data: skills.map(({ id: _id, ...s }) => s) });
  }
  if ((await db.education.count()) === 0) {
    await db.education.createMany({
      data: education.map(({ id: _id, ...e }, order) => ({ ...e, order })),
    });
  }

  const [pr, pj, ex, sk, ed] = await Promise.all([
    db.profile.count(),
    db.project.count(),
    db.experience.count(),
    db.skill.count(),
    db.education.count(),
  ]);
  console.log({
    profile: pr,
    projects: pj,
    experience: ex,
    skills: sk,
    education: ed,
  });
}

main().finally(() => db.$disconnect());
