import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About | AIKitchen",
  description: "What AIKitchen is, who it’s for, and how the system works."
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold text-amber-400">about</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">why aikitchen exists</h1>

          <div className="mt-6 space-y-5 text-white/75 leading-relaxed">
            <p>
              Most “healthy food” fails for one reason: people get bored, confused, or tired of deciding.
              AIKitchen is built for consistency — clean cooking, portion logic, rotating menu, and a WhatsApp-first flow
              that makes ordering stupidly simple.
            </p>
            <p>
              We keep the Lucknow soul intact (because taste matters) while making the everyday version lighter, cleaner,
              and more repeatable — the kind of meals you can actually stick to.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-base font-semibold text-white">who it’s for</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-white/70 space-y-2">
                <li>office lunches that don’t cause that 3pm crash</li>
                <li>fat loss / muscle gain plans that don’t feel like punishment</li>
                <li>people who want structure without tracking apps</li>
                <li>teams who want recurring corporate lunch boxes</li>
              </ul>
            </div>
          </div>

          <a
            href={waLink("Hi AIKitchen! I want to start. Please suggest a plan for my goal.")}
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            start on whatsapp
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
