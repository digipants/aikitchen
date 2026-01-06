import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { PLANS, FAQ } from "@/lib/plans";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Plans | AIKitchen",
  description: "Subscription plans for consistent healthy eating and meal structure."
};

function PriceCard({
  name,
  price,
  tag,
  points,
  highlight,
}: {
  name: string;
  price: string;
  tag: string;
  points: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "relative rounded-3xl border p-7 backdrop-blur",
        highlight
          ? "border-amber-400/50 bg-gradient-to-b from-amber-400/15 to-white/5"
          : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      {highlight ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
          most popular
        </div>
      ) : null}

      <div className="flex items-baseline justify-between gap-3">
        <div className="text-xl font-semibold text-white">{name}</div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          {tag}
        </span>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <div className="text-4xl font-semibold text-white">{price}</div>
        <div className="pb-1 text-sm text-white/60">/ plan</div>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-white/75">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-400" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={waLink(`Hi AIKitchen! I want the ${name} plan (${price}). Please share next steps.`)}
        className={highlight
          ? "mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          : "mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-white/90"
        }
      >
        start {name}
      </a>

      <div className="mt-3 text-center text-xs text-white/55">
        cancel anytime • switch plans anytime
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold text-amber-400">plans</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">structure beats motivation</h1>
          <p className="mt-4 text-white/70">
            Subscriptions exist to remove daily decision fatigue. Pick a plan and let the kitchen do the heavy lifting.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PriceCard
              key={p.name}
              name={p.name}
              tag={p.tag}
              price={p.price}
              points={p.points}
              highlight={p.highlight}
            />
          ))}
        </div>

        <div className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold text-amber-400">faq</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">quick answers</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-base font-semibold text-white">{f.q}</div>
                <div className="mt-2 text-sm text-white/70">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          Want a custom plan (exclusions, delivery time window, jain/eggetarian)? Message on WhatsApp — it’s faster than forms.
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={waLink("Hi AIKitchen! I want a personalized subscription plan.")}
            className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            personalize my plan
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
