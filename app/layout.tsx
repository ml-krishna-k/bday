import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ExperienceProvider } from "@/providers/ExperienceProvider";
import { ReducedMotionGate } from "@/components/system/ReducedMotionGate";
import { CanvasShell } from "@/components/canvas/CanvasShell";

/*
  Typography: defaults to an editorial system serif/sans stack so the app builds and runs
  with zero network access. To use the intended Fraunces + Inter on a connected machine,
  re-enable next/font/google here and add the variables to <html>:

    import { Fraunces, Inter } from "next/font/google";
    const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", style: ["normal","italic"] });
    const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
    // then: <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
*/

export const metadata: Metadata = {
  title: "for you",
  description: "Something handcrafted. Open it slowly.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#14100e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ExperienceProvider>
          <ReducedMotionGate>
            <CanvasShell>{children}</CanvasShell>
          </ReducedMotionGate>
        </ExperienceProvider>
      </body>
    </html>
  );
}
