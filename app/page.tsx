import LandingNav from "./components/LandingNav";
import HomeScrollLock from "./components/HomeScrollLock";
import WasdHeroControls from "./components/WasdHeroControls";
import { searchAlgorithmSnippets } from "./data/searchAlgorithmSnippets";

// Keep count divisible by desktop/tablet/mobile column counts to avoid sparse tail columns.
const BACKGROUND_SNIPPET_COUNT = 120;
const infiniteSearchSnippets = Array.from({ length: BACKGROUND_SNIPPET_COUNT }, (_, index) => {
  return searchAlgorithmSnippets[index % searchAlgorithmSnippets.length];
});

export default function Home() {
  return (
    <main className="home-stage flex h-[100svh] box-border items-center justify-center overflow-hidden overscroll-none px-4 sm:h-[100svh] sm:px-6 lg:h-[100dvh] lg:px-10">
      <HomeScrollLock />
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
        <header className="hero-core relative z-10 mx-auto flex flex-col items-center px-6 py-14 text-center sm:px-14 sm:py-24">
          <h1 className="hero-title title-bright mt-4 text-5xl font-semibold leading-tight sm:text-6xl">
            Minh Le
          </h1>
          <p className="hero-subtitle mt-5 max-w-2xl text-lg text-(--ink-soft) sm:text-xl">
            Tinkering with web apps since the early days of dial-up.
          </p>
          <LandingNav />
          <WasdHeroControls />
        </header>
      </div>
    </main>
  );
}
