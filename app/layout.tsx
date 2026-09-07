import { FavoritosProvider } from "@/context/FavoritosContext";
import { SeriesProvider } from "@/context/SeriesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <SeriesProvider>
                    <FavoritosProvider>
                      {children}
                    </FavoritosProvider>
                </SeriesProvider>

            </body>
        </html>
    );
}