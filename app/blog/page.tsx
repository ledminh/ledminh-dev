import { readFile } from "fs/promises";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { listBlogPostMeta, listNewestPosts } from "@/lib/blog";

type BlogPageProps = {
  searchParams?: {
    tag?: string;
    q?: string;
  };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const tag = searchParams?.tag?.trim() || undefined;
  const query = searchParams?.q?.trim() || undefined;
  const intro = await readFile("content/blog-intro.txt", "utf-8");
  const posts = await listBlogPostMeta({ tag, query });
  const newestPosts = await listNewestPosts({ limit: 3, tag, query });
  const tags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-200/80">
        <p>{intro}</p>
        {tag && (
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Filtering by tag: {tag}
          </p>
        )}
        {query && (
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Search: {query}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form
          action="/blog"
          method="get"
          className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 sm:flex-row sm:items-center lg:col-span-2"
        >
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search posts or tags"
            className="w-full flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400"
          />
          {tag && <input type="hidden" name="tag" value={tag} />}
          <button
            type="submit"
            className="rounded-full bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/25"
          >
            Search
          </button>
        </form>

        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            Newest entries
          </h2>
          {newestPosts.length === 0 ? (
            <p className="text-sm text-slate-300">
              No posts yet. Publish one from the editor.
            </p>
          ) : (
            <div className="grid gap-4">
              {newestPosts.map((post) => (
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {post.content}
                    </ReactMarkdown>
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

        <div className="space-y-6 lg:sticky lg:top-24">
          <section className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                Tags
              </h2>
              {tag && (
                <Link
                  href="/blog"
                  className="text-[10px] uppercase tracking-[0.25em] text-slate-400 hover:text-slate-200"
                >
                  Clear tag
                </Link>
              )}
            </div>
            {tags.length === 0 ? (
              <p className="text-sm text-slate-300">No tags yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/blog?tag=${encodeURIComponent(tagItem)}`}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
                  >
                    {tagItem}
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              All entries
            </h2>
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
                      className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                    >
                      <span className="text-base font-semibold">
                        {post.title}
                      </span>
                      <span className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                        {post.updatedAt
                          ? new Date(post.updatedAt).toLocaleDateString()
                          : "Draft"}{" "}
                        • {post.key}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
