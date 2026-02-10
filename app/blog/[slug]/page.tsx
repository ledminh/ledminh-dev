import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const key = decodeURIComponent(resolvedParams.slug);
  const post = await getBlogPost(key);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="break-all">{post.key}</span>
          <span>•</span>
          <span>
            {post.updatedAt
              ? new Date(post.updatedAt).toLocaleDateString()
              : "Draft"}
          </span>
        </div>
        <Link
          href="/blog"
          className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200"
        >
          Back to blog
        </Link>
      </div>

      <header className="space-y-4 grid gap-4">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              Tags
            </span>
            {post.tags.map((tag) => (
              <Link
                key={`${post.key}-${tag}`}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/20"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <article className="mdx-article max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
