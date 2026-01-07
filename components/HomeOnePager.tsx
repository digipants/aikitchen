"use client";

import React, { useMemo, useState } from "react";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import {
  Badge,
  Divider,
  FeatureCard,
  MiniIcon,
  Pill,
  SectionTitle,
  Stat,
  cn,
} from "@/components/ui";
import { waLink, PHONE_NUMBER_DISPLAY } from "@/lib/constants";
import { MENU } from "@/lib/menu";
import { PLANS, FAQ as FAQ_DATA } from "@/lib/plans";
import LeadForm from "@/components/LeadForm";

type DietType = "veg" | "non-veg" | "eggetarian" | "jain";
type GoalType = "fat_loss" | "muscle_gain" | "balance" | "medical";
type MealCount = 2 | 3 | 4;

const TESTIMONIALS = [
  {
    name: "anushka • gomti nagar",
    text: "i started with the 14-day plan — the meals are actually tasty, not “diet food”. dropped 2.1 kg without feeling hungry.",
  },
  {
    name: "rahul • hazratganj",
    text: "the ai meal plan nailed my macros. delivery is consistent, and the portioning feels premium.",
  },
  {
    name: "neha • aliganj",
    text: "i love the “nawabi + healthy” vibe. it feels local, clean, and smart. perfect for office lunch.",
  },
];

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=2200&q=80",
  bowl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80",
  thali: "/Indian-Thali.webp",
  salad:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2200&q=80",
  delivery:
    "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&q=80",
  breakfast:
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80",
};

function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "FoodEstablishment"],
    name: "AIKitchen",
    description:
      "AI-powered cloud kitchen offering personalized meal plans, healthy meals, subscriptions, and corporate catering.",
    telephone: PHONE_NUMBER_DISPLAY,
    servesCuisine: ["Indian", "Healthy", "Lucknowi"],
    priceRange: "₹₹",
    areaServed: "Lucknow",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aikitchen.co",
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: waLink(
          "Hi AIKitchen! I want to order / start a meal plan."
        ),
        inLanguage: "en-IN",
        actionPlatform: [
          "http://schema.org/MobileWebPlatform",
          "http://schema.org/DesktopWebPlatform",
        ],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function PriceCard({
  name,
  price,
  tag,
  points,
  highlight,
  cta,
}: {
  name: string;
  price: string;
  tag: string;
  points: string[];
  highlight?: boolean;
  cta: { label: string; href: string };
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border p-7 backdrop-blur",
        highlight
          ? "border-amber-400/50 bg-gradient-to-b from-amber-400/15 to-white/5"
          : "border-white/10 bg-white/5"
      )}
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
        href={cta.href}
        className={cn(
          "mt-7 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
          highlight
            ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
            : "bg-white text-slate-950 hover:bg-white/90"
        )}
      >
        {cta.label}
      </a>

      <div className="mt-3 text-center text-xs text-white/55">
        cancel anytime • switch plans anytime
      </div>
    </div>
  );
}

function MealPlanBuilder() {
  const [goal, setGoal] = useState<GoalType>("fat_loss");
  const [diet, setDiet] = useState<DietType>("veg");
  const [meals, setMeals] = useState<MealCount>(3);
  const [exclude, setExclude] = useState<string>("");

  const recommendation = useMemo(() => {
    const base =
      goal === "fat_loss"
        ? {
            kcal: 1500,
            protein: 90,
            note: "higher protein, lower oil, steady portions",
          }
        : goal === "muscle_gain"
        ? {
            kcal: 2200,
            protein: 130,
            note: "calorie surplus with lean protein focus",
          }
        : goal === "medical"
        ? {
            kcal: 1700,
            protein: 95,
            note: "clean rotation, simplified ingredients",
          }
        : { kcal: 1900, protein: 105, note: "balanced macros + variety" };

    const dietNote =
      diet === "jain"
        ? "no onion/garlic • curated rotation"
        : diet === "veg"
        ? "veg rotation • paneer/legumes focus"
        : diet === "eggetarian"
        ? "eggs + veg rotation • easy protein"
        : "lean meats + veg rotation";

    const perMeal = Math.round(base.kcal / meals);

    return { ...base, perMeal, dietNote };
  }, [goal, diet, meals]);

  const message = useMemo(() => {
    const goalLabel =
      goal === "fat_loss"
        ? "Fat Loss"
        : goal === "muscle_gain"
        ? "Muscle Gain"
        : goal === "medical"
        ? "Medical-Friendly"
        : "Balanced";

    const dietLabel =
      diet === "veg"
        ? "Veg"
        : diet === "non-veg"
        ? "Non-Veg"
        : diet === "eggetarian"
        ? "Eggetarian"
        : "Jain";

    return `Hi AIKitchen! I want a personalized plan.

Goal: ${goalLabel}
Diet: ${dietLabel}
Meals/Day: ${meals}
Exclusions: ${exclude || "None"}

Please suggest a plan + pricing.`;
  }, [goal, diet, meals, exclude]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="text-sm font-semibold text-amber-400">
            meal plan builder
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            set your goal → get an instant plan direction
          </div>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            This is a “smart preview”. Final plan gets tuned after your WhatsApp
            chat (timings, preferences, health notes).
          </p>
        </div>
        <a
          href={waLink(message)}
          className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          get plan on whatsapp
        </a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="mb-2 text-sm font-semibold text-white">goal</div>
            <div className="flex flex-wrap gap-2">
              <Pill
                active={goal === "fat_loss"}
                onClick={() => setGoal("fat_loss")}
              >
                fat loss
              </Pill>
              <Pill
                active={goal === "muscle_gain"}
                onClick={() => setGoal("muscle_gain")}
              >
                muscle gain
              </Pill>
              <Pill
                active={goal === "balance"}
                onClick={() => setGoal("balance")}
              >
                balanced
              </Pill>
              <Pill
                active={goal === "medical"}
                onClick={() => setGoal("medical")}
              >
                medical-friendly
              </Pill>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold text-white">
              diet type
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill active={diet === "veg"} onClick={() => setDiet("veg")}>
                veg
              </Pill>
              <Pill
                active={diet === "eggetarian"}
                onClick={() => setDiet("eggetarian")}
              >
                eggetarian
              </Pill>
              <Pill
                active={diet === "non-veg"}
                onClick={() => setDiet("non-veg")}
              >
                non-veg
              </Pill>
              <Pill active={diet === "jain"} onClick={() => setDiet("jain")}>
                jain
              </Pill>
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm font-semibold text-white">
              meals per day
            </div>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4].map((n) => (
                <Pill
                  key={n}
                  active={meals === n}
                  onClick={() => setMeals(n as MealCount)}
                >
                  {n} meals
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white">
              exclusions (optional)
            </label>
            <input
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              placeholder="e.g., peanuts, lactose, very spicy, no onion"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
          <div className="text-sm font-semibold text-white/80">
            your instant plan preview
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-semibold text-white">
                {recommendation.kcal}
              </div>
              <div className="mt-1 text-xs text-white/60">
                daily calories (est.)
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-semibold text-white">
                {recommendation.protein}g
              </div>
              <div className="mt-1 text-xs text-white/60">
                daily protein (est.)
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-2xl font-semibold text-white">
                {recommendation.perMeal}
              </div>
              <div className="mt-1 text-xs text-white/60">
                calories per meal
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">diet note</div>
              <div className="mt-2 text-xs text-white/70">
                {recommendation.dietNote}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <span className="font-semibold text-white">style:</span>{" "}
            {recommendation.note}
          </div>

          <a
            href={waLink(message)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
          >
            send this to whatsapp
          </a>

          <div className="mt-3 text-center text-xs text-white/55">
            pro-tip: add your preferred delivery time window in chat
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuPreview() {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="text-sm font-semibold text-amber-400">
            menu preview
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            lucknow taste, but built for consistency
          </div>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Rotating menu + stable macros. You get variety without breaking your
            plan.
          </p>
        </div>

        <a
          href="/menu"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
        >
          view full menu
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {MENU.map((m, idx) => (
          <Pill
            key={m.category}
            active={idx === active}
            onClick={() => setActive(idx)}
          >
            {m.category}
          </Pill>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {MENU[active].items.map((it) => (
          <div
            key={it.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="text-base font-semibold text-white">
                {it.name}
              </div>
              <div className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
                ₹{it.price}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="text-sm font-semibold text-white">
                  {it.kcal}
                </div>
                <div>kcal</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="text-sm font-semibold text-white">
                  {it.protein}
                </div>
                <div>protein</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="text-sm font-semibold text-white">low oil</div>
                <div>style</div>
              </div>
            </div>

            <a
              href={waLink(
                `Hi AIKitchen! I want to order: ${it.name} (₹${it.price}).`
              )}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
            >
              order this on whatsapp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeOnePager() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <JsonLd />
      <TopNav />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={UNSPLASH.hero}
            alt="AIKitchen Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/70 to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="flex flex-wrap gap-2">
            <Badge>personalized meal plans</Badge>
            <Badge>subscriptions + one-off meals</Badge>
            <Badge>delivery + dine-in</Badge>
            <Badge>lucknow special • clean kitchen</Badge>
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                eat like a <span className="text-amber-400">nawab</span>, stay
                in your <span className="text-amber-400">macros</span>.
              </h1>

              <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">
                AIKitchen is a smart cloud kitchen for busy Lucknow — meal
                plans, clean portions, rotating menu, and a WhatsApp-first
                ordering flow. Less guessing. More consistency.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={waLink(
                    "Hi AIKitchen! I want to order / start a meal plan."
                  )}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  order on whatsapp
                </a>
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  see subscription plans
                </a>
                <a
                  href={`tel:${PHONE_NUMBER_DISPLAY.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  call: {PHONE_NUMBER_DISPLAY}
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Stat label="weekly plan starts" value="₹999" />
                <Stat label="avg delivery time" value="35–55m" />
                <Stat label="menu rotations" value="4x/week" />
              </div>

              <div className="mt-6 text-xs text-white/55">
                *pricing and delivery timing are subject to change — depends on
                your custom order.
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="relative h-52">
                  <img
                    src={UNSPLASH.kitchen}
                    alt="Kitchen"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-lg font-semibold">
                      today’s best move
                    </div>
                    <div className="mt-1 text-sm text-white/70">
                      pick a goal → set diet → get a plan
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid gap-3">
                    <a
                      href="#builder"
                      className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-white/90"
                    >
                      build my meal plan
                    </a>
                    <a
                      href={waLink(
                        "Hi AIKitchen! Please share today’s menu with prices and delivery slots."
                      )}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                    >
                      get today’s menu
                    </a>
                    <a
                      href="#corporate"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                    >
                      corporate lunch boxes
                    </a>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/65">
                    <span className="text-white font-semibold">
                      smart add-on:
                    </span>{" "}
                    nutrition coaching notes + weekly progress check-in.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* TRUST STRIP */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              [
                "portion control",
                "meals designed to be consistent, not random.",
              ],
              ["clean cooking", "lower oil, controlled sugar, safer choices."],
              ["local taste", "lucknow flavors without “diet sadness.”"],
              ["whatsapp-first", "order faster than any app scroll."],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-base font-semibold">{t}</div>
                <div className="mt-2 text-sm text-white/70">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          kicker="everything in one system"
          title="a full stack kitchen experience (not just “food delivery”)"
          sub="AIKitchen is built to drive custom orders: personalization, subscriptions, and quick ordering."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="personalized meal plans"
            desc="goal-based portions + rotating menu logic. you get variety without breaking structure."
            icon={<MiniIcon path="M7 7h10M7 12h10M7 17h6" />}
          />
          <FeatureCard
            title="macro-friendly labeling"
            desc="kcal + protein cues on popular items. helps office crowd and gym crowd instantly decide."
            icon={<MiniIcon path="M12 3v18M5 8h14" />}
          />
          <FeatureCard
            title="subscriptions"
            desc="weekly/monthly plans, pause/skip, and “auto-repeat” for serious consistency."
            icon={<MiniIcon path="M7 12a5 5 0 1 0 10 0M12 7v5l2 2" />}
          />
          <FeatureCard
            title="whatsapp order flow"
            desc="click-to-chat option with built-in messages. fast order → less scroll."
            icon={
              <MiniIcon path="M7 10h10M7 14h6M5 20l2-2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14z" />
            }
          />
          <FeatureCard
            title="corporate lunch program"
            desc="recurring office lunch boxes: fixed schedule, counts, and billing."
            icon={<MiniIcon path="M7 7h10v10H7zM4 7h3M17 7h3M4 17h3M17 17h3" />}
          />
          <FeatureCard
            title="dine-in + takeaway"
            desc="dine-in and takeaway with plans, combos, and loyalty programs."
            icon={<MiniIcon path="M6 8h12M6 12h12M6 16h12" />}
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              img: UNSPLASH.breakfast,
              title: "breakfast that actually works",
              sub: "light, filling, non-greasy",
              note: "People quit healthy eating because breakfast is boring. Fix breakfast, you fix the whole day.",
            },
            {
              img: UNSPLASH.salad,
              title: "clean ingredients",
              sub: "simple rotation, less junk",
              note: "Think “repeatable” meals — the kind you can eat daily without regret.",
            },
            {
              img: UNSPLASH.thali,
              title: "lucknow soul",
              sub: "taste stays. oil drops.",
              note: "Local taste wins hearts. Healthy taste wins wellbeing. We want both.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative h-48">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-white/70">{c.sub}</div>
                </div>
              </div>
              <div className="p-6 text-sm text-white/70">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BUILDER */}
      <section id="builder" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <MealPlanBuilder />
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <MenuPreview />
      </section>

      {/* PLANS */}
      <section id="plans" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionTitle
          kicker="subscriptions"
          title="plans that lock in consistency"
          sub="Make the subscription the hero. One-off orders are still available — but plans build a habit."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PriceCard
              key={p.name}
              name={p.name}
              tag={p.tag}
              price={p.price}
              highlight={p.highlight}
              points={p.points}
              cta={{
                label: `start ${p.name}`,
                href: waLink(
                  `Hi AIKitchen! I want the ${p.name} plan (${p.price}). Please share next steps.`
                ),
              }}
            />
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <span className="font-semibold text-white">Strong opinion:</span>{" "}
          subscriptions are good because they remove decision fatigue. Keep one
          subscription active to get the most out of healthy routine.
        </div>
      </section>

      {/* CORPORATE */}
      <section id="corporate" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-sm font-semibold text-amber-400">
                corporate program
              </div>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                office lunch boxes that don’t crash productivity
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Recurring schedule, standardized portions, and monthly billing.
                Great for teams that want clean meals without daily ordering
                chaos.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "weekly menu cycles",
                    "planned rotation so teams don’t get bored.",
                  ],
                  ["fixed delivery window", "reduces office disruptions."],
                  ["veg + non-veg splits", "easy batch management."],
                  [
                    "billing + reports",
                    "counts, invoices, and schedule clarity.",
                  ],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="text-base font-semibold text-white">
                      {t}
                    </div>
                    <div className="mt-2 text-sm text-white/70">{d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(
                    "Hi AIKitchen! I need corporate lunch boxes. Please ask: headcount, schedule, veg/non-veg split, billing."
                  )}
                  className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
                >
                  get corporate quote
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  talk to sales
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="relative h-72">
                <img
                  src={UNSPLASH.bowl}
                  alt="Corporate meal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-lg font-semibold text-white">
                    bulk orders, zero mess
                  </div>
                  <div className="mt-1 text-sm text-white/70">
                    schedule • portions • billing — handled
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl font-semibold text-white">20+</div>
                  <div className="mt-1 text-xs text-white/60">
                    min boxes/day
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl font-semibold text-white">3</div>
                  <div className="mt-1 text-xs text-white/60">menu cycles</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <div className="text-xl font-semibold text-white">
                    monthly
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    billing option
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionTitle
          kicker="faq"
          title="answers that remove friction"
          sub="If someone has to ask on WhatsApp, your page is leaking conversions."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FAQ_DATA.map((f) => (
            <div
              key={f.q}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="text-base font-semibold text-white">{f.q}</div>
              <div className="mt-2 text-sm text-white/70">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionTitle
          kicker="social proof"
          title="real people stick when the food is consistent"
          sub="Testimonials are crucial for improvement. We appreciate what people say about us."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="text-sm font-semibold text-white">{t.name}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                “{t.text}”
              </p>
              <div
                className="mt-5 flex gap-1 text-amber-400"
                aria-label="5 stars"
              >
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
        <SectionTitle
          kicker="contact"
          title="let’s start your plan"
          sub="Submit the enquiry (email notification) or jump to WhatsApp and finish fast."
        />
        <div className="mt-10">
          <LeadForm />
        </div>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">whatsapp</div>
              <a
                className="mt-2 block text-sm text-amber-400 hover:underline"
                href={waLink(
                  "Hi AIKitchen! I want to order / start a meal plan."
                )}
              >
                chat now
              </a>
              <div className="mt-2 text-xs text-white/60">
                fastest way to start
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">phone</div>
              <a
                className="mt-2 block text-sm text-amber-400 hover:underline"
                href={`tel:${PHONE_NUMBER_DISPLAY.replace(/\s/g, "")}`}
              >
                {PHONE_NUMBER_DISPLAY}
              </a>
              <div className="mt-2 text-xs text-white/60">
                for quick confirmations
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">
                delivery areas
              </div>
              <div className="mt-2 text-sm text-white/70">
                sarsawan • ahmamau • arjuganj
              </div>
              <div className="mt-2 text-xs text-white/60">
                we try to deliver beyond these areas too
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
