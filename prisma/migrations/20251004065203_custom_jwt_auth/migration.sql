-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "github_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "github_access_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "short_name" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'medium',
    "release_status" TEXT NOT NULL DEFAULT 'live',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_languages" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_stages" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL,
    "difficulty_level" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repositories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,
    "github_repo_name" TEXT NOT NULL,
    "github_repo_id" TEXT,
    "clone_url" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "commit_sha" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "test_output" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_stage_completions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_stage_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_slug_key" ON "languages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "course_languages_course_id_idx" ON "course_languages"("course_id");

-- CreateIndex
CREATE INDEX "course_languages_language_id_idx" ON "course_languages"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_languages_course_id_language_id_key" ON "course_languages"("course_id", "language_id");

-- CreateIndex
CREATE INDEX "course_stages_course_id_position_idx" ON "course_stages"("course_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "course_stages_course_id_slug_key" ON "course_stages"("course_id", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "course_stages_course_id_position_key" ON "course_stages"("course_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_github_repo_id_key" ON "repositories"("github_repo_id");

-- CreateIndex
CREATE INDEX "repositories_user_id_idx" ON "repositories"("user_id");

-- CreateIndex
CREATE INDEX "repositories_course_id_idx" ON "repositories"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "repositories_user_id_course_id_language_id_key" ON "repositories"("user_id", "course_id", "language_id");

-- CreateIndex
CREATE INDEX "submissions_repository_id_stage_id_idx" ON "submissions"("repository_id", "stage_id");

-- CreateIndex
CREATE INDEX "submissions_user_id_idx" ON "submissions"("user_id");

-- CreateIndex
CREATE INDEX "submissions_status_idx" ON "submissions"("status");

-- CreateIndex
CREATE INDEX "course_stage_completions_user_id_idx" ON "course_stage_completions"("user_id");

-- CreateIndex
CREATE INDEX "course_stage_completions_stage_id_idx" ON "course_stage_completions"("stage_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_stage_completions_user_id_stage_id_key" ON "course_stage_completions"("user_id", "stage_id");

-- AddForeignKey
ALTER TABLE "course_languages" ADD CONSTRAINT "course_languages_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_languages" ADD CONSTRAINT "course_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_stages" ADD CONSTRAINT "course_stages_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "course_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_stage_completions" ADD CONSTRAINT "course_stage_completions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_stage_completions" ADD CONSTRAINT "course_stage_completions_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "course_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
