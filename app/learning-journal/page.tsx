import { promises as fs } from "fs";
import path from "path";
import Description from "./description.mdx";
import ToggleContent from "../components/ToggleContent";
import Link from "next/link";

export const metadata = {
  title: "Learning Lab | Minh Le",
  description: "Experiment lab for my learning",
};

type Entry = {
  title: string;
  description: string;
  slug: string;
  date?: string;
  status?: string;
  tags?: string[];
};

function parseFrontmatter(source: string): Record<string, string> | null {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return null;
  }

  const frontmatter: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value: string | string[] = trimmed.slice(separatorIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, "");

    frontmatter[key] = value;
  }

  return frontmatter;
}

async function getEntries(): Promise<Entry[]> {
  const entriesDir = path.join(
    process.cwd(),
    "app",
    "learning-journal",
    "entries",
  );

  try {
    const files = await fs.readdir(entriesDir, { withFileTypes: true });
    const mdxFiles = files.filter(
      (file) => file.isFile() && file.name.endsWith(".mdx"),
    );

    const entries: (Entry | null)[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(entriesDir, file.name);
        const raw = await fs.readFile(filePath, "utf8");
        const frontmatter = parseFrontmatter(raw);
        if (!frontmatter) {
          return null;
        }

        let slug = file.name.replace(/\.mdx$/, ""),
          title = frontmatter.title || "",
          description = frontmatter.description || "",
          date = frontmatter.date || "",
          status = frontmatter.status || "";

        let tags = frontmatter.tags
          ? frontmatter.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [];

        return {
          title,
          description,
          slug,
          date,
          status,
          tags,
        };
      }),
    );

    return entries
      .filter((entry): entry is Entry => Boolean(entry))
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (a.date) {
          return -1;
        }
        if (b.date) {
          return 1;
        }
        return a.title.localeCompare(b.title);
      });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export default async function LearningLabPage() {
  const entries = await getEntries();

  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-4xl">
        <main className="px-6 py-12 sm:px-10">
          <p className="section-label">Learning Journal</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            The documentation of my learning journey
          </h1>
          <div className="mt-4 max-w-2xl text-base text-(--ink-soft) sm:text-lg mdx-article">
            <ToggleContent>
              <Description />
            </ToggleContent>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {entries.map((entry) => (
              <Link
                className="glass-card block rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)]"
                href={`/learning-journal/entries/${entry.slug}`}
                key={entry.slug}
              >
                <article>
                  <h2 className="text-2xl font-semibold">{entry.title}</h2>
                  {(entry.date || entry.status || entry.tags) && (
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-(--ink-soft)">
                      {[entry.date, entry.status, entry.tags?.join(" · ")]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <div className="mt-3 text-sm text-(--ink-soft)">
                    {entry.description}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
