import type { Metadata, Viewport } from "next";
import { Unbounded, Schibsted_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1A0E22",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Southern Komfort Bar & Grill · Soul food in the City of Orange, NJ",
  description:
    "A modern soul food experience in the City of Orange, New Jersey, where culture, cuisine and music meet. Oxtails, lemon pepper wings, salmon, mac and cheese, candied yams, a full bar, and late nights on the weekend. (973) 672-9100.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${schibsted.variable} ${dmMono.variable}`}
    >
      <body>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
