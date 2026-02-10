# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- `npm run dev` — Start Next.js development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

No test framework is configured.

## Tech Stack

- **Next.js 16** with App Router, React 19, TypeScript 5 (strict)
- **Tailwind CSS 4** (via `@tailwindcss/postcss`, no tailwind.config file)
- **MDX**: `@next/mdx` for page-level MDX, `mdx-bundler` for dynamic MDX processing
- **AWS SDK v3**: S3 for blog content storage, DynamoDB for blog metadata

## Architecture

### Dual Content System

1. **Blog** (`app/blog/`): Content stored remotely in AWS S3 (markdown) + DynamoDB (metadata). Data fetching in `lib/blog.ts` with functions like `listBlogPostMeta()`, `getBlogPost()`, `listNewestPosts()`. Rendered with `react-markdown`.

2. **Learning Journal** (`app/learning-journal/`): Local `.mdx` files in `app/learning-journal/entries/`. Processed with `mdx-bundler` at build time. Uses manual frontmatter parsing (no gray-matter). Uses `generateStaticParams()` for static generation.

### Client/Server Component Split

Server Components are the default. Client Components (`"use client"`) are used only for interactive elements:
- `WasdHeroControls` — WASD keyboard-driven 3D CSS transforms on landing page
- `SearchBar` — form handling with navigation
- `ToggleContent` — expand/collapse UI
- `Breadcrumb` — uses `usePathname()` hook

### Routing

- Dynamic routes: `/blog/[slug]` and `/learning-journal/entries/[slug]`
- Nested layouts for blog section (`app/blog/layout.tsx`, `app/blog/[slug]/layout.tsx`)
- Filtering via URL search params (tag, search query)

### Styling

- Tailwind utility classes + custom CSS with CSS variables (--paper, --ink, --accent, etc.)
- Dark-themed design with glass morphism patterns
- Custom fonts: Geist Sans, Geist Mono
- Styles in `app/styles/globals.css` and `app/styles/mdx-article.css`

### Path Alias

`@/*` maps to project root (configured in tsconfig.json).

## Environment Variables (for AWS blog)

- `S3_BUCKET_NAME` — S3 bucket for blog content
- `DDB_TABLE_NAME` — DynamoDB table for blog metadata
- `MY_AWS_REGION` / `AWS_REGION` / `AWS_DEFAULT_REGION` — AWS region
- Debug endpoint: `/api/env` checks env var availability
