import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { site } from "@/content";
import "./globals.css";

// Design language asks for Aeonik Pro (paid) for headings; DM Sans is its listed substitute.
// If you license Aeonik, swap in next/font/local here.
const display = DM_Sans({ variable: "--font-display", subsets: ["latin"], weight: "500" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: site.name,
  description: "TODO: One-line site description.",
};

export const viewport: Viewport = { themeColor: "#030014" }; // tints the mobile browser bar

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
