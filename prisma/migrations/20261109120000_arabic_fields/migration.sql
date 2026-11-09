-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "about_ar" TEXT,
ADD COLUMN     "availability_ar" TEXT,
ADD COLUMN     "headline_ar" TEXT,
ADD COLUMN     "heroLead_ar" TEXT,
ADD COLUMN     "heroPhrases_ar" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location_ar" TEXT,
ADD COLUMN     "name_ar" TEXT,
ADD COLUMN     "summary_ar" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description_ar" TEXT,
ADD COLUMN     "shortDescription_ar" TEXT,
ADD COLUMN     "title_ar" TEXT;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "bullets_ar" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "company_ar" TEXT,
ADD COLUMN     "location_ar" TEXT,
ADD COLUMN     "role_ar" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "category_ar" TEXT;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "degree_ar" TEXT,
ADD COLUMN     "institution_ar" TEXT;
