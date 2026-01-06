"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { waLink, PHONE_NUMBER_DISPLAY } from "@/lib/constants";

export default function TopNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={isHome ? "#top" : "/"} className="flex items-center gap-2">
          <img
            src="/aikitchen-icon-bg.svg"
            alt="Corporate meal"
            className="h-full w-9 object-cover"
            loading="lazy"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">AIKitchen</div>
            <div className="text-xs text-white/60">
              healthy • nawabi • smart
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={anchor("#features")}
            className="text-sm text-white/75 hover:text-white"
          >
            features
          </a>
          <a
            href={anchor("#menu")}
            className="text-sm text-white/75 hover:text-white"
          >
            menu
          </a>
          <a
            href={anchor("#plans")}
            className="text-sm text-white/75 hover:text-white"
          >
            plans
          </a>
          <a
            href={anchor("#corporate")}
            className="text-sm text-white/75 hover:text-white"
          >
            corporate
          </a>
          <Link
            href="/about"
            className="text-sm text-white/75 hover:text-white"
          >
            about
          </Link>
          <Link
            href="/contact"
            className="text-sm text-white/75 hover:text-white"
          >
            contact
          </Link>

          <a
            href={waLink("Hi AIKitchen! I want to order / start a plan.")}
            className="rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            whatsapp order
          </a>
        </div>

        <a
          href={`tel:${PHONE_NUMBER_DISPLAY.replace(/\s/g, "")}`}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 md:hidden"
        >
          call
        </a>
      </div>
    </div>
  );
}
