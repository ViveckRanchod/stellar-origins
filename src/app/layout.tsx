import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import ClickSpark from "@/components/ClickSpark";
import { DevNav } from "@/components/DevNav";
import Galaxy from "@/components/Galaxy";
import { site } from "@/content";
import "./globals.css";

// Same type as trakpad-web: Hanken Grotesk for everything, Barlow Condensed for numbers,
// JetBrains Mono for small uppercase labels. next/font self-hosts them at build time.
const sans = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const num = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: site.name,
  description: "TODO: One-line site description.",
};

export const viewport: Viewport = { themeColor: "#000000" }; // tints the mobile browser bar

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${num.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div aria-hidden className="fixed inset-0 -z-10 opacity-70">
          <Galaxy
            mouseInteraction={false}
            mouseRepulsion={false}
            density={1.5}
            glowIntensity={0.25}
            saturation={0.6}
            hueShift={0}
            speed={0.3}
            starSpeed={0.15}
            rotationSpeed={0.02}
            twinkleIntensity={0.2}
          />
        </div>
        <DevNav />
        {children}
        <ClickSpark sparkColor="#f4f0ff" sparkSize={10} sparkRadius={18} sparkCount={8} duration={400} />
      </body>
    </html>
  );
}
