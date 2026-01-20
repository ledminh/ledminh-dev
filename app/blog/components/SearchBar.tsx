"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  query?: string;
  tag?: string;
};

export default function SearchBar({ query, tag }: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(query ?? "");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (tag) {
          params.set("tag", tag);
        }
        if (value.trim()) {
          params.set("q", value.trim());
        }
        const suffix = params.toString();
        router.push(suffix ? `/blog?${suffix}` : "/blog");
        setValue("");
      }}
      className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 sm:flex-row sm:items-center lg:col-span-2"
    >
      <input
        type="text"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search posts or tags"
        className="w-full flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-full bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/25"
      >
        Search
      </button>
    </form>
  );
}
