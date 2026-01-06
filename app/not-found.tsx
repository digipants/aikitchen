export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="text-sm font-semibold text-amber-400">404</div>
        <h1 className="mt-3 text-4xl font-semibold">page not found</h1>
        <p className="mt-3 text-white/70">
          Looks like this page doesn’t exist. Head back to the home page and order something sensible.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
        >
          back to home
        </a>
      </div>
    </div>
  );
}
