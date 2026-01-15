export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-[32px]">
        <header className="border-b border-white/10 px-6 py-10 sm:px-10">
          <p className="section-label">Blog</p>
          <h1 className="title-bright mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Writing about calm, reliable interfaces
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[color:var(--ink-soft)] sm:text-lg">
            Short essays on UI systems, shipping habits, and whatever I am
            experimenting with next.
          </p>
        </header>
        <main className="px-6 py-10 sm:px-10">
          <article className="mdx-article">{children}</article>
        </main>
      </div>
    </div>
  );
}
