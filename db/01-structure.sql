CREATE TABLE "categories" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY,
  "name" TEXT
);

ALTER TABLE "categories" ADD CONSTRAINT pkCategories PRIMARY KEY (id);
CREATE UNIQUE INDEX pkCategoriesName ON "categories" (name);

CREATE TABLE "notes" (
  "id" BIGINT GENERATED ALWAYS AS IDENTITY,
  "name" TEXT,
  "createdAt" TIMESTAMP,
  "deletedAt" TIMESTAMP,
  "category" integer NOT NULL,
  "content" TEXT,
  "isArchived" BOOLEAN
);

ALTER TABLE "notes" ADD CONSTRAINT pkNotes PRIMARY KEY (id);
ALTER TABLE "notes" ADD CONSTRAINT fkNotesCategoryId FOREIGN KEY ("category") REFERENCES "categories" (id) ON DELETE CASCADE;