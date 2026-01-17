import { promises as fs } from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

type EntryFrontmatter = {
  title: string;
  description: string;
  date?: string;
  status?: string;
  tags?: string[];
};

const entriesDir = path.join(
  process.cwd(),
  "app",
  "learning-journal",
  "entries",
);

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

function toFrontmatter(input: Record<string, string>): EntryFrontmatter | null {
  if (!input.title || !input.description) {
    return null;
  }

  const tags = input.tags
    ? input.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : undefined;

  return {
    title: input.title,
    description: input.description,
    date: input.date,
    status: input.status,
    tags,
  };
}

async function getEntrySource(slug: string) {
  const filePath = path.join(entriesDir, `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsedFrontmatter = parseFrontmatter(raw);
    const frontmatter = parsedFrontmatter
      ? toFrontmatter(parsedFrontmatter)
      : null;

    if (!frontmatter) {
      return null;
    }

    const { code } = await bundleMDX({
      source: raw,
      cwd: path.dirname(filePath),
      esbuildOptions: (options) => {
        options.platform = "node";
        options.target = ["es2020"];
        options.external = [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
        ];
        return options;
      },
    });

    return { code, frontmatter };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(entriesDir, { withFileTypes: true });
    return files
      .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
      .map((file) => ({
        slug: file.name.replace(/\.mdx$/, ""),
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
  const entry = await getEntrySource(slug);

  if (!entry) {
    return {
      title: "Entry | Minh Le",
    };
  }

  return {
    title: `${entry.frontmatter.title} | Minh Le`,
    description: entry.frontmatter.description,
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntrySource(slug);

  if (!entry) {
    notFound();
  }

  const meta = [
    entry.frontmatter.date,
    entry.frontmatter.status,
    entry.frontmatter.tags?.join(" · "),
  ]
    .filter(Boolean)
    .join(" · ");

  const Content = getMDXComponent(entry.code) as ComponentType;

  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-[32px]">
        <main className="px-6 py-12 sm:px-10">
          <Link
            className="text-xs uppercase tracking-[0.18em] text-[color:var(--ink-soft)] transition hover:text-[color:var(--accent)]"
            href="/learning-journal"
          >
            ← Back to Learning Journal
          </Link>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            {entry.frontmatter.title}
          </h1>
          {meta ? (
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              {meta}
            </p>
          ) : null}
          <p className="mt-4 max-w-2xl text-base text-[color:var(--ink-soft)] sm:text-lg">
            {entry.frontmatter.description}
          </p>
          <article className="mdx-article mt-8">
            <Content />
          </article>
        </main>
      </div>
    </div>
  );
}
