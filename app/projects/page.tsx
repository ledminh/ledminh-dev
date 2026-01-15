export const metadata = {
  title: "Projects | Minh Le",
  description: "Side projects and product experiments by Minh Le.",
};

export default function ProjectsPage() {
  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-[32px]">
        <main className="px-6 py-12 sm:px-10">
          <p className="section-label">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Side builds worth sharing
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[color:var(--ink-soft)] sm:text-lg">
            A small mix of experiments and utilities built to sharpen my product
            instincts.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Compass",
                detail:
                  "A habit tracker with soft motion, weekly planning, and a calming UI rhythm.",
              },
              {
                title: "Field Notes",
                detail:
                  "A note-taking workspace with tags, fast search, and focus-friendly layouts.",
              },
              {
                title: "Signal Room",
                detail:
                  "A realtime team status board with lightweight alerts and rollups.",
              },
              {
                title: "Orbit",
                detail:
                  "A micro dashboard for shipping metrics and release reminders.",
              },
            ].map((project) => (
              <article
                className="glass-card rounded-[24px] p-6"
                key={project.title}
              >
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
                  {project.detail}
                </p>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
