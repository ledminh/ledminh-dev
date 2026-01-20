import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

type EntryListProps = {
  posts: BlogPostMeta[];
};

export default function EntryList({ posts }: EntryListProps) {
  return (
    <section className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-sm text-slate-300">
          No posts yet. Publish one from the editor.
        </p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.key}>
              <Link
                href={`/blog/${encodeURIComponent(post.key)}`}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-5 py-1 text-slate-100 transition hover:border-white/20 hover:bg-white/10"
              >
                <span className="text-base font-semibold">{post.title}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {post.updatedAt
                    ? new Date(post.updatedAt).toLocaleDateString()
                    : "Draft"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
