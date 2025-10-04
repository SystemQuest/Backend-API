-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "short_description" TEXT;

-- AlterTable
ALTER TABLE "repositories" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "output_summary" TEXT;
