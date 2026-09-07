import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { FavoritosProvider } from "@/context/FavoritosContext";
import { SeriesProvider } from "@/context/SeriesContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
// Cada una genera una variable CSS (--font-playfair, --font-inter) que ya conectamos arriba en globals.css con --font-display / --font-sans

export const metadata: Metadata = {
  title: "Mi Catálogo de Series"
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen">
        <SeriesProvider>
          <FavoritosProvider>
            <header className="border-b border-border">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                <h1 className="font-display text-2xl text-foreground">
                  Mi Catálogo de Series
                </h1>
              </div>
            </header>
            {children}
          </FavoritosProvider>
        </SeriesProvider>
      </body>
    </html>
  );
}