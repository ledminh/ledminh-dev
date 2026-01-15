export default function Home() {
  return (
    <div className="px-4 pb-16 pt-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-6xl overflow-hidden rounded-4xl">
        <header className="flex flex-col gap-6 border-b border-black/10 bg-white/70 px-6 py-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 rounded-2xl border border-black/10 bg-white/80 text-center text-2xl font-semibold leading-11">
              ML
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-(--ink-soft)">
                Portfolio
              </p>
              <p className="text-lg font-semibold">Minh Le</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-(--ink-soft)">
            <a className="hover:text-black" href="#work">
              Work
            </a>
            <a className="hover:text-black" href="#timeline">
              Timeline
            </a>
            <a className="hover:text-black" href="#projects">
              Projects
            </a>
            <a className="hover:text-black" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <main>
          <section
            className="grid gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]"
            id="home"
          >
            <div className="space-y-6 animate-rise">
              <p className="section-label">Software developer</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Designing clean, calm front ends for complex products.
              </h1>
              <p className="text-base text-(--ink-soft) sm:text-lg">
                I am Minh Le, a front-end focused developer based in South
                Carolina. I like building thoughtful UI systems, elevating
                design quality, and shipping experiences that feel effortless.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-medium">
                <span className="rounded-full border border-black/10 bg-white/80 px-4 py-2">
                  Front End
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-4 py-2">
                  React + Next.js
                </span>
                <span className="rounded-full border border-black/10 bg-white/80 px-4 py-2">
                  UI Systems
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  className="rounded-full bg-(--accent) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/70 transition hover:-translate-y-0.5"
                  href="#projects"
                >
                  View projects
                </a>
                <a
                  className="rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                  href="#contact"
                >
                  Let us talk
                </a>
              </div>
            </div>

            <div className="glass-card flex flex-col gap-6 rounded-[28px] p-6 animate-rise animate-rise-delay-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-(--ink-soft)">
                  Availability
                </p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Open to roles
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-2xl font-semibold">
                  Focused on product UI, motion, and accessibility.
                </p>
                <p className="text-sm text-(--ink-soft)">
                  Currently supporting AI training workflows while sharpening my
                  front-end craft.
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="text-(--ink-soft)">Location</span>
                  <span className="font-semibold">South Carolina</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="text-(--ink-soft)">Toolbox</span>
                  <span className="font-semibold">
                    TypeScript, Figma, Tailwind
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-(--ink-soft)">Collab</span>
                  <span className="font-semibold">Remote or hybrid</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 border-y border-black/10 bg-white/60 px-6 py-10 sm:grid-cols-3 sm:px-10 animate-rise animate-rise-delay-2">
            <div>
              <p className="text-sm font-semibold text-(--ink-soft)">
                Years building
              </p>
              <p className="text-3xl font-semibold">4+</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-(--ink-soft)">
                Shipped features
              </p>
              <p className="text-3xl font-semibold">25+</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-(--ink-soft)">
                Favorite stack
              </p>
              <p className="text-3xl font-semibold">Next.js</p>
            </div>
          </section>

          <section className="px-6 py-12 sm:px-10" id="work">
            <div className="flex flex-col gap-2">
              <p className="section-label">Selected work</p>
              <h2 className="text-3xl font-semibold">
                Projects that shaped my craft
              </h2>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Design system refresh",
                  detail:
                    "Modernized UI components and created a reusable layout kit for faster product delivery.",
                  tag: "UI Systems",
                },
                {
                  title: "Insights dashboard",
                  detail:
                    "Built a data-rich interface with charts, filters, and responsive data tables.",
                  tag: "Product UI",
                },
                {
                  title: "Onboarding flows",
                  detail:
                    "Designed and implemented onboarding screens focused on clarity and retention.",
                  tag: "UX + Motion",
                },
              ].map((item) => (
                <article
                  className="glass-card flex h-full flex-col justify-between rounded-3xl p-6 transition hover:-translate-y-1"
                  key={item.title}
                >
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-(--ink-soft)">
                      {item.tag}
                    </p>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-(--ink-soft)">{item.detail}</p>
                  </div>
                  <span className="mt-6 text-sm font-semibold text-(--accent-2)">
                    View case study
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white/60 px-6 py-12 sm:px-10" id="timeline">
            <div className="flex flex-col gap-2">
              <p className="section-label">Timeline</p>
              <h2 className="text-3xl font-semibold">
                Where I have been learning
              </h2>
            </div>
            <div className="mt-8 space-y-6 border-l border-black/10 pl-6">
              {[
                {
                  year: "2024 - Present",
                  title: "AI Data Trainer",
                  detail:
                    "Partnering with AI teams to refine annotation workflows, review outputs, and improve model feedback loops.",
                },
                {
                  year: "2022 - 2024",
                  title: "Front End Developer",
                  detail:
                    "Delivered responsive UI updates, component libraries, and performance optimizations for client products.",
                },
                {
                  year: "2020",
                  title: "B.S. Computer Science, San Jose State University",
                  detail:
                    "Graduated with a focus on software engineering and user-centric design.",
                },
              ].map((item) => (
                <div className="space-y-2" key={item.title}>
                  <p className="text-sm font-semibold text-(--accent-2)">
                    {item.year}
                  </p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-(--ink-soft)">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 py-12 sm:px-10" id="study">
            <div className="flex flex-col gap-2">
              <p className="section-label">Study</p>
              <h2 className="text-3xl font-semibold">
                Current learning sprint
              </h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                "Advanced React patterns and composition",
                "Design tokens and theme orchestration",
                "Motion choreography for product UI",
                "Web performance and Core Web Vitals",
              ].map((topic) => (
                <div
                  className="glass-card rounded-[20px] p-5 text-sm font-medium text-(--ink-soft)"
                  key={topic}
                >
                  {topic}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/60 px-6 py-12 sm:px-10" id="projects">
            <div className="flex flex-col gap-2">
              <p className="section-label">Projects</p>
              <h2 className="text-3xl font-semibold">
                Side builds worth sharing
              </h2>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Compass",
                  detail:
                    "A habit tracker with calming micro-animations and flexible weekly planning.",
                },
                {
                  title: "Field Notes",
                  detail:
                    "A note-taking app with rich search, tags, and a focused editor layout.",
                },
                {
                  title: "Signal Room",
                  detail:
                    "Realtime status dashboard for small teams, built with websockets.",
                },
              ].map((project) => (
                <article
                  className="glass-card rounded-3xl p-6 transition hover:-translate-y-1"
                  key={project.title}
                >
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-(--ink-soft)">
                    {project.detail}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-soft)">
                    <span>Next.js</span>
                    <span>TypeScript</span>
                    <span>UI</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="px-6 py-12 sm:px-10" id="contact">
            <div className="glass-card grid gap-6 rounded-[28px] p-8 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="section-label">Contact</p>
                <h2 className="text-3xl font-semibold">
                  Want a dependable front-end partner?
                </h2>
                <p className="text-sm text-(--ink-soft)">
                  I am open to new opportunities, collaborations, and freelance
                  projects. Send a quick note and I will respond with next
                  steps.
                </p>
                <a
                  className="inline-flex w-fit rounded-full bg-(--accent-2) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/70 transition hover:-translate-y-0.5"
                  href="mailto:minh.le@email.com"
                >
                  minh.le@email.com
                </a>
              </div>
              <div className="space-y-4 text-sm text-(--ink-soft)">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span>Preferred</span>
                  <span className="font-semibold text-black">Email</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <span>Response time</span>
                  <span className="font-semibold text-black">24-48 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Socials</span>
                  <span className="font-semibold text-black">
                    LinkedIn / GitHub
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-black/10 bg-white/70 px-6 py-6 text-sm text-(--ink-soft) sm:px-10">
          <p>© 2024 Minh Le. Crafted with care in South Carolina.</p>
        </footer>
      </div>
    </div>
  );
}
