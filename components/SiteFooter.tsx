import Link from "next/link";
import { waLink } from "@/lib/constants";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-white">AIKitchen</div>
            <div className="mt-1 text-xs text-white/60">Lucknow • personalized meal plans</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink("Hi AIKitchen! I want to order / start a meal plan.")}
              className="rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              whatsapp order
            </a>
            <Link
              href="/menu"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              menu
            </Link>
            <Link
              href="/plans"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              plans
            </Link>
            <a
              href="#top"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              back to top
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/50">
          © {new Date().getFullYear()} AIKitchen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
