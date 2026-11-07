/**
 * Seeds the static blog posts from app/blog/posts.ts into MongoDB.
 * Run with: npm run seed
 * Idempotent: existing posts (matched by slug) are skipped.
 */
import { readFileSync } from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { blogPosts } from "../app/blog/posts";

// Load MONGODB_URI from .env.local
const envFile = readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.trim().match(/^([A-Z_]+)=(.*)$/);
  if (match && !process.env[match[1]]) {
    process.env[match[1]] = match[2].trim().replace(/^"|"$/g, "");
  }
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

async function seed() {
  const client = new MongoClient(uri!);
  await client.connect();
  const collection = client.db(process.env.MONGODB_DB || "veyra").collection("posts");

  await collection.createIndex({ slug: 1 }, { unique: true });

  let inserted = 0;
  let skipped = 0;

  for (const post of blogPosts) {
    const existing = await collection.findOne({ slug: post.slug });
    if (existing) {
      skipped++;
      continue;
    }
    // Strip the legacy numeric id; MongoDB provides _id
    const { id: _legacyId, ...data } = post;
    const now = new Date().toISOString();
    await collection.insertOne({ ...data, createdAt: now, updatedAt: now });
    inserted++;
  }

  console.log(`Seed complete: ${inserted} inserted, ${skipped} already existed.`);
  await client.close();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
