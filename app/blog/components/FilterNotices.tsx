type FilterNoticesProps = {
  tag?: string;
  query?: string;
};

export default function FilterNotices({ tag, query }: FilterNoticesProps) {
  if (!tag && !query) {
    return null;
  }

  return (
    <>
      {tag && (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-200/80">
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Filtering by tag: {tag}
          </p>
        </div>
      )}
      {query && (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-slate-200/80">
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
            Search: {query}
          </p>
        </div>
      )}
    </>
  );
}
