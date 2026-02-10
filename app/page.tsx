import LandingNav from "./components/LandingNav";
import WasdHeroControls from "./components/WasdHeroControls";
import { searchAlgorithmSnippets } from "./data/searchAlgorithmSnippets";

// Keep count divisible by desktop/tablet/mobile column counts to avoid sparse tail columns.
const BACKGROUND_SNIPPET_COUNT = 240;
const infiniteSearchSnippets = Array.from({ length: BACKGROUND_SNIPPET_COUNT }, (_, index) => {
  return searchAlgorithmSnippets[index % searchAlgorithmSnippets.length];
});

export default function Home() {
  return (
    <main className="home-stage flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
      <div aria-hidden="true" className="algorithm-lake">
        <div className="algorithm-stream">
          {infiniteSearchSnippets.map((snippet, index) => (
            <pre className="algo-card" key={`search-snippet-${index}`}>
              <code>{snippet}</code>
            </pre>
          ))}
        </div>
      </div>
      <div className="home-shell relative z-10 mx-auto w-full max-w-5xl">
        <header className="hero-core relative z-10 mx-auto flex flex-col items-center px-8 py-24 text-center sm:px-14">
          <h1 className="title-bright mt-4 text-5xl font-semibold leading-tight sm:text-6xl">
            Minh Le
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-(--ink-soft) sm:text-xl">
            Tinkering with web apps since the early days of dial-up (or at least
            the modern internet).
          </p>
          <LandingNav />
          <WasdHeroControls />
        </header>
      </div>
    </main>
  );
}
