import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost } from "@/lib/blog";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const key = decodeURIComponent(params.slug);
  const post = await getBlogPost(key);

  return (
    <div className="space-y-8">
      <Link
        href="/blog"
        className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-200"
      >
        Back to blog
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>{post.key}</span>
          <span>•</span>
          <span>
            {post.updatedAt
              ? new Date(post.updatedAt).toLocaleDateString()
              : "Draft"}
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={`${post.key}-${tag}`}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      <article className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
