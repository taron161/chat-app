import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import RainEffect from "@/components/RainEffect";
import PixelEffects from "@/components/PixelEffects";
import KpopEffects from "@/components/KpopEffects";
import "./globals.css";
import "@/styles/cyberpunk.css";
import "@/styles/retro.css";
import "@/styles/rainy.css";
import "@/styles/8bit.css";
import "@/styles/kpop.css";
import "@/styles/mechanical.css";

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat app with multiple themes",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <RainEffect />
            <PixelEffects />
            <KpopEffects />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}