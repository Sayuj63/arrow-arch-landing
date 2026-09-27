import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://arrow-arch-landing.vercel.app",
  ),
  title: "The Arrow Arch — Aim once. Land once.",
  description:
    "One clear request in. A bounded AI crew plans, builds and proves the change before it lands. Powered by IBM Bob Shell.",
  openGraph: {
    title: "The Arrow Arch — Aim once. Land once.",
    description: "One prompt. A reviewable branch. A proof trail.",
    images: ["/assets/illustrations/hero-trajectory.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/arrow-mark.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
