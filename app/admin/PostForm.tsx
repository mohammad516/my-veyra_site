"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ArticleSection, BlogPost, FaqItem } from "@/lib/posts";

const inputClass =
  "w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm";
const labelClass = "block text-sm font-medium mb-1.5 text-neutral-300";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function arrayToLines(arr?: string[]): string {
  return (arr ?? []).join("\n");
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    } else {
      alert("Image upload failed");
    }
    e.target.value = "";
  };

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload"
          className={inputClass}
        />
        <label className="shrink-0 cursor-pointer rounded-lg border border-neutral-600 px-4 py-2.5 text-sm text-neutral-300 hover:border-blue-500">
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt={label} className="mt-2 h-24 w-40 object-cover rounded-lg" />
      )}
    </div>
  );
}

interface SectionDraft {
  heading: string;
  paragraphs: string;
  bullets: string;
  numbered: string;
  checklist: string;
  image: string;
}

function sectionToDraft(section: ArticleSection): SectionDraft {
  return {
    heading: section.heading,
    paragraphs: arrayToLines(section.paragraphs),
    bullets: arrayToLines(section.bullets),
    numbered: arrayToLines(section.numbered),
    checklist: arrayToLines(section.checklist),
    image: section.image ?? "",
  };
}

function draftToSection(draft: SectionDraft): ArticleSection {
  const section: ArticleSection = { heading: draft.heading };
  const paragraphs = linesToArray(draft.paragraphs);
  const bullets = linesToArray(draft.bullets);
  const numbered = linesToArray(draft.numbered);
  const checklist = linesToArray(draft.checklist);
  if (paragraphs.length) section.paragraphs = paragraphs;
  if (bullets.length) section.bullets = bullets;
  if (numbered.length) section.numbered = numbered;
  if (checklist.length) section.checklist = checklist;
  if (draft.image.trim()) section.image = draft.image.trim();
  return section;
}

export default function PostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const isEdit = Boolean(post?._id);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [category, setCategory] = useState(post?.category ?? "Web Development");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Veyra Team");
  const [authorAvatar, setAuthorAvatar] = useState(post?.authorAvatar ?? "/logo.png");
  const [date, setDate] = useState(
    post?.date ??
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  );
  const [readTime, setReadTime] = useState(post?.readTime ?? "5 min read");
  const [image, setImage] = useState(post?.image ?? "");
  const [image2, setImage2] = useState(post?.image2 ?? "");
  const [intro, setIntro] = useState(arrayToLines(post?.intro));
  const [finalThoughts, setFinalThoughts] = useState(arrayToLines(post?.finalThoughts));
  const [sections, setSections] = useState<SectionDraft[]>(
    post?.sections?.map(sectionToDraft) ?? []
  );
  const [faqs, setFaqs] = useState<FaqItem[]>(post?.faqs ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateSection = (index: number, patch: Partial<SectionDraft>) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setSections((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug: slug || slugify(title),
      category,
      excerpt,
      author,
      authorAvatar,
      date,
      readTime,
      image,
      image2: image2 || image,
      intro: linesToArray(intro),
      sections: sections.filter((s) => s.heading.trim()).map(draftToSection),
      finalThoughts: linesToArray(finalThoughts),
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
    };

    const res = await fetch(isEdit ? `/api/posts/${post!._id}` : "/api/posts", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save the post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
        <h2 className="font-bold text-lg">Basic Info</h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Slug (URL) *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              required
              className={inputClass}
            />
            <p className="text-neutral-500 text-xs mt-1">Post URL: veyra.website/{slug || "..."}</p>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Excerpt (shown on cards)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Read time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <ImageField label="Author avatar" value={authorAvatar} onChange={setAuthorAvatar} />
      </div>

      {/* Images */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
        <h2 className="font-bold text-lg">Images</h2>
        <ImageField label="Main image *" value={image} onChange={setImage} />
        <ImageField
          label="Second image (shown mid-article, optional)"
          value={image2}
          onChange={setImage2}
        />
      </div>

      {/* Intro */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Introduction</h2>
        <label className={labelClass}>One paragraph per line</label>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </div>

      {/* Sections */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Content Sections</h2>
          <button
            type="button"
            onClick={() =>
              setSections((prev) => [
                ...prev,
                { heading: "", paragraphs: "", bullets: "", numbered: "", checklist: "", image: "" },
              ])
            }
            className="rounded-lg border border-neutral-600 px-4 py-2 text-sm hover:border-blue-500"
          >
            + Add Section
          </button>
        </div>

        {sections.map((section, i) => (
          <div key={i} className="border border-neutral-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-neutral-400">Section {i + 1}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(i, -1)}
                  className="rounded border border-neutral-600 px-2 py-1 text-xs hover:border-blue-500"
                  aria-label="Move section up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, 1)}
                  className="rounded border border-neutral-600 px-2 py-1 text-xs hover:border-blue-500"
                  aria-label="Move section down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setSections((prev) => prev.filter((_, j) => j !== i))}
                  className="rounded border border-red-800 px-2 py-1 text-xs text-red-400 hover:border-red-500"
                >
                  Remove
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>Heading</label>
              <input
                type="text"
                value={section.heading}
                onChange={(e) => updateSection(i, { heading: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Paragraphs (one per line)</label>
              <textarea
                value={section.paragraphs}
                onChange={(e) => updateSection(i, { paragraphs: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Numbered list (one per line)</label>
                <textarea
                  value={section.numbered}
                  onChange={(e) => updateSection(i, { numbered: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bullet list (one per line)</label>
                <textarea
                  value={section.bullets}
                  onChange={(e) => updateSection(i, { bullets: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Checklist (one per line)</label>
                <textarea
                  value={section.checklist}
                  onChange={(e) => updateSection(i, { checklist: e.target.value })}
                  rows={3}
                  className={inputClass}
                />
              </div>
            </div>

            <ImageField
              label="Section image (optional)"
              value={section.image}
              onChange={(url) => updateSection(i, { image: url })}
            />
          </div>
        ))}

        {sections.length === 0 && (
          <p className="text-neutral-500 text-sm">No sections yet — click &quot;+ Add Section&quot;.</p>
        )}
      </div>

      {/* Final thoughts */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Final Thoughts</h2>
        <label className={labelClass}>One paragraph per line</label>
        <textarea
          value={finalThoughts}
          onChange={(e) => setFinalThoughts(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </div>

      {/* FAQs */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">FAQs</h2>
          <button
            type="button"
            onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "" }])}
            className="rounded-lg border border-neutral-600 px-4 py-2 text-sm hover:border-blue-500"
          >
            + Add FAQ
          </button>
        </div>
        <p className="text-neutral-500 text-xs">
          Leave empty to show the default FAQs on this post.
        </p>

        {faqs.map((faq, i) => (
          <div key={i} className="border border-neutral-700 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-400">FAQ {i + 1}</span>
              <button
                type="button"
                onClick={() => setFaqs((prev) => prev.filter((_, j) => j !== i))}
                className="rounded border border-red-800 px-2 py-1 text-xs text-red-400 hover:border-red-500"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={faq.question}
              onChange={(e) =>
                setFaqs((prev) =>
                  prev.map((f, j) => (j === i ? { ...f, question: e.target.value } : f))
                )
              }
              placeholder="Question"
              className={inputClass}
            />
            <textarea
              value={faq.answer}
              onChange={(e) =>
                setFaqs((prev) =>
                  prev.map((f, j) => (j === i ? { ...f, answer: e.target.value } : f))
                )
              }
              placeholder="Answer"
              rows={2}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 sticky bottom-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-8 py-3 font-semibold disabled:opacity-50 shadow-lg"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-lg border border-neutral-600 px-6 py-3 text-neutral-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
