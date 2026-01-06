import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIKitchen — Healthy • Nawabi • Smart",
  description:
    "AI-powered cloud kitchen offering personalized meal plans, subscriptions, and corporate lunch programs in Lucknow.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aikitchen.in"),
  openGraph: {
    title: "AIKitchen — Healthy • Nawabi • Smart",
    description:
      "Personalized meal plans, clean portions, rotating menu, and WhatsApp-first ordering.",
    url: "/",
    siteName: "AIKitchen",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
