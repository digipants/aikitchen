import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { MENU } from "@/lib/menu";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Menu | AIKitchen",
  description: "Explore AIKitchen’s rotating menu with macro-friendly cues."
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold text-amber-400">menu</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">pick smart. eat happy.</h1>
          <p className="mt-4 text-white/70">
            Macro cues are a guide, not a religion. If you want a tighter plan, use the meal-plan builder on home.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {MENU.map((cat) => (
            <section key={cat.category} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                    category
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{cat.category}</h2>
                </div>
                <a
                  href={waLink(`Hi AIKitchen! Please share today’s availability for ${cat.category}.`)}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  check availability
                </a>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {cat.items.map((it) => (
                  <div key={it.name} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-base font-semibold text-white">{it.name}</div>
                      <div className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
                        ₹{it.price}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                        <div className="text-sm font-semibold text-white">{it.kcal}</div>
                        <div>kcal</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                        <div className="text-sm font-semibold text-white">{it.protein}</div>
                        <div>protein</div>
                      </div>
                    </div>

                    <a
                      href={waLink(`Hi AIKitchen! I want to order: ${it.name} (₹${it.price}).`)}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-white/90"
                    >
                      order on whatsapp
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          Want a structured plan (goal + diet + schedule)? Go to the home page and use the meal-plan builder.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
