import Link from "next/link";

type TagListProps = {
  tags: string[];
  activeTag?: string;
};

export default function TagList({ tags, activeTag }: TagListProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 px-6 py-2">
      {activeTag && (
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-[10px] uppercase tracking-[0.25em] text-slate-400 hover:text-slate-200"
          >
            Clear tag
          </Link>
        </div>
      )}

      {tags.length === 0 ? (
        <p className="text-sm text-slate-300">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
