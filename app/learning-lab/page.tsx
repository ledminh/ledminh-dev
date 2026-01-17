import { promises as fs } from "fs";
import path from "path";
import Description from "./description.mdx";
import Link from "next/link";

export const metadata = {
  title: "Learning Lab | Minh Le",
  description: "Experiment lab for my learning",
};

type Experiment = {
  title: string;
  description: string;
  slug: string;
  date: string;
  status: string;
  tags: string[];
  href: string;
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
    let value = trimmed.slice(separatorIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    frontmatter[key] = value;
  }

  return frontmatter;
}

async function getExperiments(): Promise<Experiment[]> {
  const experimentsDir = path.join(process.cwd(), "app", "learning-lab", "mdx");

  try {
    const entries = await fs.readdir(experimentsDir, { withFileTypes: true });
    const mdxFiles = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".mdx"),
    );

    const experiments = await Promise.all(
      mdxFiles.map(async (entry) => {
        const slug = entry.name.replace(/\.mdx$/, "");
        const filePath = path.join(experimentsDir, entry.name);
        const raw = await fs.readFile(filePath, "utf8");
        const frontmatter = parseFrontmatter(raw);

        if (!frontmatter?.title || !frontmatter?.description) {
          return null;
        }

        const href = `/learning-lab/entries/${slug}`;
        const tags = frontmatter.tags
          ? frontmatter.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : undefined;

        return {
          title: frontmatter.title,
          description: frontmatter.description,
          slug,
          date: frontmatter.date,
          status: frontmatter.status,
          tags,
          href,
        };
      }),
    );

    return experiments
      .filter((experiment): experiment is Experiment => Boolean(experiment))
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
  const experiments = await getExperiments();

  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-[32px]">
        <main className="px-6 py-12 sm:px-10">
          <p className="section-label">Learning Lab</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            The storage room for my experiments
          </h1>
          <div className="mt-4 max-w-2xl text-base text-[color:var(--ink-soft)] sm:text-lg">
            <Description />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {experiments.map((experiment) => (
              <Link
                className="glass-card block rounded-[24px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)]"
                href={
                  experiment.href ?? `/learning-lab/entries/${experiment.slug}`
                }
                key={experiment.slug}
              >
                <article>
                  <h2 className="text-2xl font-semibold">{experiment.title}</h2>
                  {(experiment.date ||
                    experiment.status ||
                    experiment.tags) && (
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                      {[
                        experiment.date,
                        experiment.status,
                        experiment.tags?.join(" · "),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
                    {experiment.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
