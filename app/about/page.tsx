export const metadata = {
  title: "About | Minh Le",
  description: "Background, timeline, and contact details for Minh Le.",
};

import timeline from "./timeline.json";
import contact from "./contact.json";
import ToggleContent from "../components/ToggleContent";
import Description from "./description.mdx";

export default function AboutPage() {
  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-4xl">
        <main className="px-6 py-12 sm:px-10">
          <p className="section-label">About</p>
          <h1 className="title-bright mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            A little more about me
          </h1>
          <ToggleContent>
            <Description />
          </ToggleContent>
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Timeline</h2>
            <div className="mt-4 space-y-4 border-l border-white/10 pl-5 text-sm text-(--ink-soft)">
              {timeline.map((item) => (
                <div key={item.title}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--accent-2)">
                    {item.year}
                  </p>
                  <p className="font-semibold text-(--ink)">{item.title}</p>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <div className="mt-4 space-y-3 text-sm text-(--ink-soft)">
              {contact.map((item) => (
                <p key={item.label}>
                  {item.label}:{" "}
                  {item.href ? (
                    <a
                      className={`font-semibold ${
                        item.accent ? "text-(--accent)" : ""
                      }`}
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
