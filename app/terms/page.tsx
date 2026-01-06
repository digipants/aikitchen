import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms | AIKitchen",
  description: "Basic terms of service for AIKitchen ordering and subscriptions."
};

export default function Page() {
  return (
    <div id="top" className="min-h-screen bg-slate-950 text-white">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-sm font-semibold text-amber-400">terms</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">terms of service</h1>

          <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
            <p>
              Menu items, pricing, and availability may change based on season and kitchen operations.
            </p>
            <p>
              Subscription plans can be paused or modified depending on operational feasibility and prior notice.
            </p>
            <p>
              Delivery times are estimates and can vary due to traffic, weather, and order volume.
            </p>
            <p>
              If you have allergies or medical conditions, please mention them clearly on WhatsApp before ordering.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
