import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

type ExperimentFrontmatter = {
  title: string;
  description: string;
  date?: string;
  status?: string;
  tags?: string[];
};

const experimentsDir = path.join(process.cwd(), "app", "learning-lab", "mdx");

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

async function getExperimentSource(slug: string) {
  const filePath = path.join(experimentsDir, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const frontmatter = parseFrontmatter(raw);
    const body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");

    if (!frontmatter?.title || !frontmatter?.description) {
      return null;
    }

    const tags = frontmatter.tags
      ? frontmatter.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : undefined;

    return {
      filePath,
      body,
      frontmatter: {
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        status: frontmatter.status,
        tags,
      } satisfies ExperimentFrontmatter,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const entries = await fs.readdir(experimentsDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => ({
        slug: entry.name.replace(/\.mdx$/, ""),
      }));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = await getExperimentSource(slug);

  if (!experiment) {
    return {
      title: "Experiment | Minh Le",
    };
  }

  return {
    title: `${experiment.frontmatter.title} | Minh Le`,
    description: experiment.frontmatter.description,
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getExperimentSource(slug);

  if (!entry) {
    notFound();
  }

  const { default: Content } = await evaluate(entry.body, {
    ...runtime,
    baseUrl: pathToFileURL(entry.filePath).href,
  });

  const meta = [
    entry.frontmatter.date,
    entry.frontmatter.status,
    entry.frontmatter.tags?.join(" · "),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-[32px]">
        <main className="px-6 py-12 sm:px-10">
          <Link
            className="text-xs uppercase tracking-[0.18em] text-[color:var(--ink-soft)] transition hover:text-[color:var(--accent)]"
            href="/learning-lab"
          >
            ← Back to Learning Lab
          </Link>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            {entry.frontmatter.title}
          </h1>
          {meta ? (
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              {meta}
            </p>
          ) : null}
          <article className="mdx-article mt-8">
            <Content />
          </article>
        </main>
      </div>
    </div>
  );
}
