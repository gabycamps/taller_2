import { SeriesProvider } from "@/context/SeriesContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <SeriesProvider>
                    {children}
                </SeriesProvider>
            </body>
        </html>
    );
}