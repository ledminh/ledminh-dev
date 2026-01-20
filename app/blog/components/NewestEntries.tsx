import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "@/lib/blog";

type NewestEntriesProps = {
  posts: BlogPost[];
};

export default function NewestEntries({ posts }: NewestEntriesProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
        Newest entries
      </h2>
      {posts.length === 0 ? (
        <p className="text-sm text-slate-300">
          No posts yet. Publish one from the editor.
        </p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.key}
              className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Link
                    href={`/blog/${encodeURIComponent(post.key)}`}
                    className="text-lg font-semibold text-white hover:text-slate-200"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {post.updatedAt
                      ? new Date(post.updatedAt).toLocaleDateString()
                      : "Draft"}
                  </p>
                </div>
              </div>
              <div className="mt-4 line-clamp-4 text-sm text-slate-200/80">
                <div className="mdx-article">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/blog/${encodeURIComponent(post.key)}`}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-slate-100"
                >
                  Continue reading
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
