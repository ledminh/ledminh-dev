import Breadcrumb from "../components/Breadcrumb";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-4xl">
        <Breadcrumb />
        <header className="border-b border-white/10 px-6 py-10 sm:px-10">
          <h1 className="title-bright mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Place where I jot down my thoughts.
          </h1>
        </header>
        <main className="px-6 py-10 sm:px-10">
          <article className="mdx-article">{children}</article>
        </main>
      </div>
    </div>
  );
}
