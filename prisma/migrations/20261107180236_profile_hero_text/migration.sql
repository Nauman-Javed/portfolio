-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "heroLead" TEXT NOT NULL DEFAULT 'I engineer',
ADD COLUMN     "heroPhrases" TEXT[] DEFAULT ARRAY['fast interfaces', 'accessible UIs', 'type-safe apps', 'things that ship']::TEXT[];
