"use client";
import { createContext, useContext, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface Series {
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
    addSerie: (serie: Omit<Series, "id">) => void;
    updateSerie: (id: number, serie: Partial<Series>) => void;
    deleteSerie: (id: number) => void;
}

const SeriesContext = createContext<SeriesContextType | null>(null);

const seriesIniciales: Series[] = [
    {
        id: 1,
        title: "Breaking Bad",
        genre: "Drama",
        seasons: 5,
        platform: "Netflix",
        rating: 9.5,
        image: "",
        description: "Un profesor de química se convierte en fabricante de metanfetaminas.",
    },
];

export function SeriesProvider({ children }: { children: ReactNode }) {
    const [series, setSeries] = useLocalStorage<Series[]>("series", seriesIniciales);

    const loading = false;


    const addSerie = (newSerie: Omit<Series, "id">) => {
        const nuevaSerie: Series = {
            ...newSerie,
            id: Date.now(),
        };
        setSeries((prev) => [...prev, nuevaSerie]);
    };

    const updateSerie = (id: number, updates: Partial<Series>) => {
        setSeries((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
        );
    };

    const deleteSerie = async (id: number) => {
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