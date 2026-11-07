import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  checklist?: string[];
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id?: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  finalThoughts: string[];
  faqs?: FaqItem[];
  // Former slugs, kept so renamed posts can 301 to their current URL
  previousSlugs?: string[];
  image: string;
  image2: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION = "posts";

// Placeholder FAQs shown on articles that have none of their own
export const defaultFaqs: FaqItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects take between 2 to 6 weeks depending on the scope and features. At Veyra, we share a clear timeline before we start and keep you updated at every milestone.",
  },
  {
    question: "Can I manage and update the content myself?",
    answer:
      "Yes. We build every website with an easy-to-use content management system, and we provide a walkthrough so your team can update text, images, and products without touching code.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Absolutely. Every Veyra project includes post-launch support, and we offer maintenance plans that cover updates, security, backups, and performance monitoring.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(doc: any): BlogPost {
  const { _id, ...rest } = doc;
  return { ...rest, _id: _id?.toString() } as BlogPost;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(serialize);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ slug });
  return doc ? serialize(doc) : null;
}

export async function getPostByPreviousSlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ previousSlugs: slug });
  return doc ? serialize(doc) : null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  return doc ? serialize(doc) : null;
}

export async function createPost(
  data: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">
): Promise<BlogPost> {
  const db = await getDb();
  const now = new Date().toISOString();
  const result = await db.collection(COLLECTION).insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { ...data, _id: result.insertedId.toString(), createdAt: now, updatedAt: now };
}

export async function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "_id" | "createdAt" | "updatedAt">>
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const _id = new ObjectId(id);
  const collection = db.collection(COLLECTION);

  const { previousSlugs: _ignored, ...fields } = data;
  void _ignored;
  const update: Record<string, unknown> = {
    $set: { ...fields, updatedAt: new Date().toISOString() },
  };

  // Remember the old slug when it changes so the old URL can redirect
  if (fields.slug) {
    const current = await collection.findOne({ _id }, { projection: { slug: 1 } });
    if (current && current.slug !== fields.slug) {
      update.$addToSet = { previousSlugs: current.slug };
    }
    // A slug that is live again must not keep redirecting elsewhere.
    // Separate update: $pull and $addToSet cannot target one field together.
    await collection.updateOne({ _id }, { $pull: { previousSlugs: fields.slug } } as never);
  }

  const result = await collection.updateOne({ _id }, update as never);
  return result.matchedCount > 0;
}

export async function deletePost(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const db = await getDb();
  const query: Record<string, unknown> = { slug };
  if (excludeId && ObjectId.isValid(excludeId)) {
    query._id = { $ne: new ObjectId(excludeId) };
  }
  const doc = await db.collection(COLLECTION).findOne(query, { projection: { _id: 1 } });
  return doc !== null;
}
