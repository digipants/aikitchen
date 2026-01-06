import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import LeadForm from "@/components/LeadForm";
import { waLink, PHONE_NUMBER_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | AIKitchen",
  description: "Contact AIKitchen for meal plans, orders, and corporate lunch programs."
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-semibold text-amber-400">contact</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            talk to us
          </h1>
          <p className="mt-4 text-white/70">
            Forms work. WhatsApp works faster. Use whichever feels easiest.
          </p>
        </div>

        <div className="mt-12">
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
      </main>
      <SiteFooter />
    </div>
  );
}
