import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import RainEffect from "@/components/RainEffect";
import PixelEffects from "@/components/PixelEffects";
import "./globals.css";
import "@/styles/cyberpunk.css";
import "@/styles/retro.css";
import "@/styles/rainy.css";
import "@/styles/8bit.css";

export const metadata: Metadata = {
  title: "Chat with Themes",
  description: "Chat with theme switching",
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
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}