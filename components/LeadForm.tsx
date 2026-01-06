"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/components/ui";
import { waLink } from "@/lib/constants";

const UNSPLASH = {
  delivery:
    "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&q=80",
};

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    goal: "",
    message: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", phone: "", area: "", goal: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const quickWa = useMemo(() => {
    return waLink(
      `Hi AIKitchen! I want to start.

Name: ${form.name || "-"}
Phone: ${form.phone || "-"}
Area: ${form.area || "-"}
Goal: ${form.goal || "-"}
Message: ${form.message || "-"}`.trim()
    );
  }, [form]);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
        <div className="text-sm font-semibold text-amber-400">
          quick enquiry
        </div>
        <div className="mt-2 text-2xl font-semibold text-white">
          get pricing + delivery slots
        </div>
        <p className="mt-2 text-sm text-white/70">
          Fill this form and we’ll reach out. Or skip the friction and tap
          WhatsApp.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="your name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
            />
            <input
              required
              value={form.phone}
              onChange={(e) =>
                setForm((s) => ({ ...s, phone: e.target.value }))
              }
              placeholder="phone / whatsapp"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={form.area}
              onChange={(e) => setForm((s) => ({ ...s, area: e.target.value }))}
              placeholder="area (e.g., gomti nagar)"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
            />
            <input
              value={form.goal}
              onChange={(e) => setForm((s) => ({ ...s, goal: e.target.value }))}
              placeholder="goal (fat loss / muscle / balanced)"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
            />
          </div>

          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((s) => ({ ...s, message: e.target.value }))
            }
            placeholder="message (diet preferences, delivery time, exclusions)"
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-amber-400/60"
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex flex-1 items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
                status === "loading"
                  ? "bg-white/30 text-white"
                  : "bg-amber-400 text-slate-950 hover:bg-amber-300"
              )}
            >
              {status === "loading" ? "sending..." : "submit enquiry"}
            </button>

            <a
              href={quickWa}
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
            >
              whatsapp instead
            </a>
          </div>

          {status === "success" ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
              received! we’ll contact you shortly.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">
              something went wrong. please try whatsapp.
            </div>
          ) : null}
        </form>
      </div>

      <div className="space-y-5">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
          <div className="text-sm font-semibold text-amber-400">fast lanes</div>
          <div className="mt-2 text-xl font-semibold text-white">
            order in 30 seconds
          </div>
          <p className="mt-2 text-sm text-white/70">
            If your goal is consistency, WhatsApp ordering beats “scrolling and
            thinking.”
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={waLink(
                "Hi AIKitchen! Please share today’s menu + delivery slots."
              )}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              today’s menu
            </a>
            <a
              href={waLink(
                "Hi AIKitchen! I want weekly/monthly subscription pricing."
              )}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              subscription pricing
            </a>
            <a
              href={waLink(
                "Hi AIKitchen! I need corporate lunch boxes (count + schedule)."
              )}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              corporate lunches
            </a>
            <a
              href={waLink(
                "Hi AIKitchen! I want a custom diet plan with exclusions."
              )}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              custom plan
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="relative h-56 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={UNSPLASH.delivery}
              alt="Delivery"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-lg font-semibold text-white">
                delivery + dine-in
              </div>
              <div className="mt-1 text-sm text-white/70">
                built for busy people — office lunches, post-workout meals, and
                clean dinners.
              </div>
            </div>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">
                fast delivery
              </div>
              <div className="mt-1 text-xs text-white/60">
                slots + area coverage
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">
                macro-friendly
              </div>
              <div className="mt-1 text-xs text-white/60">
                portioning that makes sense
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-white">
                clean kitchen
              </div>
              <div className="mt-1 text-xs text-white/60">
                standardized prep + hygiene
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
