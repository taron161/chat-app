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

// ... metadata и viewport ...

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