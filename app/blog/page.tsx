import { listBlogPostMeta, listNewestPosts } from "@/lib/blog";
import EntryList from "@/app/blog/components/EntryList";
import FilterNotices from "@/app/blog/components/FilterNotices";
import NewestEntries from "@/app/blog/components/NewestEntries";
import SearchBar from "@/app/blog/components/SearchBar";
import TagList from "@/app/blog/components/TagList";

type BlogPageProps = {
  searchParams?: Promise<{
    tag?: string;
    q?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const tag = resolvedParams.tag?.trim() || undefined;
  const query = resolvedParams.q?.trim() || undefined;
  const posts = await listBlogPostMeta({ tag, query });
  const newestPosts = await listNewestPosts({ limit: 5, tag, query });
  const tags = tag
    ? [tag]
    : Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) =>
        a.localeCompare(b),
      );

  return (
    <div className="space-y-10">
      <SearchBar query={query} tag={tag} />
      <FilterNotices query={query} tag={tag} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <NewestEntries posts={newestPosts} />

        <div className="space-y-4 lg:sticky lg:top-24">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            Tags
          </h2>
          <TagList tags={tags} activeTag={tag} />
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            All entries
          </h2>
          <EntryList posts={posts} />
        </div>
      </div>
    </div>
  );
}
