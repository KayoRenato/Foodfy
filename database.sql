DELETE FROM files;
DELETE FROM recipes;
DELETE FROM recipe_files;
DELETE FROM chefs;

ALTER SEQUENCE files_id_seq RESTART WITH 1;
ALTER SEQUENCE recipes_id_seq RESTART WITH 1;
ALTER SEQUENCE recipe_files_id_seq RESTART WITH 1;
ALTER SEQUENCE chefs_id_seq RESTART WITH 1;

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs"("id") ON DELETE CASCADE;

CREATE DATABASE foodfy

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int REFERENCES "chefs" ("id"),
  "image" text NOT NULL,
  "title" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL

);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" INTEGER REFERENCES "recipes"("id"),
  "file_id" INTEGER REFERENCES "files"("id")
);

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp ();