import Breadcrumb from "./components/Breadcrumb";
import LandingNav from "./components/LandingNav";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
      <div className="page-shell mx-auto max-w-4xl overflow-hidden rounded-4xl">
        <Breadcrumb />
        <header className="flex flex-col items-center px-8 py-20 text-center backdrop-blur sm:px-14">
          <h1 className="title-bright mt-4 text-5xl font-semibold leading-tight sm:text-6xl">
            Minh Le
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-(--ink-soft) sm:text-xl">
            Tinkering with web apps since the early days of dial-up (or at least
            the modern internet).
          </p>
          <LandingNav />
        </header>
      </div>
    </div>
  );
}
