// Shapes mirror the Prisma models planned in the migration brief, so swapping
// placeholder data for database reads later does not touch the components.

export type Profile = {
  name: string;
  headline: string;
  summary: string;
  about: string;
  location: string | null;
  email: string;
  imageUrl: string | null;
  resumeUrl: string | null;
  availability: string | null;
  heroLead: string;
  heroPhrases: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  coverImageUrl: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
};

export type EmploymentType = string;

export type Experience = {
  id: string;
  company: string;
  role: string;
  employmentType: EmploymentType;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  bullets: string[];
  order: number;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  iconUrl: string | null;
  order: number;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  startYear: number;
  endYear: number | null;
};
