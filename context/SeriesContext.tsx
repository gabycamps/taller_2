"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Series {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
    description: string;
}

interface SeriesContextType {
    series: Series[];
    loading: boolean;
    addSerie: (serie: Omit<Series, "id">) => Promise<void>;
    updateSerie: (id: number, serie: Partial<Series>) => Promise<void>;
    deleteSerie: (id: number) => Promise<void>;
}

const SeriesContext = createContext<SeriesContextType | null>(null);

export function SeriesProvider({ children }: { children: ReactNode }) {
    const [series, setSeries] = useState<Series[]>([]);
    const [loading, setLoading] = useState(true);

    // Cargar series al iniciar
    useEffect(() => {
        fetchSeries();
    }, []);

    const fetchSeries = async () => {
        const res = await fetch("https://api.ejemplo.com/series");
        const data = await res.json();
        setSeries(data);
        setLoading(false);
    };

    const addSerie = async (newSerie: Omit<Series, "id">) => {
        const res = await fetch("https://api.ejemplo.com/series", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSerie),
        });
        const created = await res.json();
        setSeries((prev) => [...prev, created]);
    };

    const updateSerie = async (id: number, updates: Partial<Series>) => {
        const res = await fetch(`https://api.ejemplo.com/series/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
        });
        const updated = await res.json();
        setSeries((prev) => prev.map((s) => (s.id === id ? updated : s)));
    };

    const deleteSerie = async (id: number) => {
        await fetch(`https://api.ejemplo.com/series/${id}`, { method: "DELETE" });
        setSeries((prev) => prev.filter((s) => s.id !== id));
    };

    return (
        <SeriesContext.Provider value={{ series, loading, addSerie, updateSerie, deleteSerie }}>
            {children}
        </SeriesContext.Provider>
    );
}

// Custom hook para usar el contexto
export function useSeries() {
    const context = useContext(SeriesContext);
    if (!context) {
        throw new Error("useSeries debe usarse dentro de un SeriesProvider");
    }
    return context;
}