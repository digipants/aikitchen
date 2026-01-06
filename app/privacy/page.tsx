import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { waLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | AIKitchen",
  description: "Privacy policy for AIKitchen enquiries and ordering."
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold text-amber-400">privacy</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">privacy policy</h1>

          <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
            <p>
              We collect only what we need to respond to your enquiry or order — typically your name,
              phone/WhatsApp number, delivery area, goal, and preferences.
            </p>
            <p>
              We do not sell your data. We may store enquiry details to improve service and follow up on orders.
            </p>
            <p>
              If you want your enquiry data removed, message us on WhatsApp with the phone number you used.
            </p>
          </div>

          <a
            href={waLink("Hi AIKitchen! Please delete my enquiry data associated with my phone number.")}
            className="mt-10 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            request data deletion
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
