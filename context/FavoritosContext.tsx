"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritosContextType{
    favoritos: number[];
    toggleFavorito: (id: number) => void;
    isFavorito: (id: number) => boolean;
}

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export function FavoritosProvider({children}: {children: ReactNode}){
    const [favoritos, setFavoritos] = useState<number[]>(() => {
        if (typeof window === "undefined") return [];
        try{
            const stored = localStorage.getItem("favoritos");
            return stored ? JSON.parse(stored): [];
        }catch{
            return[];
        }
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        }
    }, [favoritos]);

    const toggleFavorito = (id: number) => {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    const isFavorito = (id: number) => favoritos.includes(id);

    return (
        <FavoritosContext.Provider value={{ favoritos, toggleFavorito, isFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos(){
    const context = useContext(FavoritosContext);
    if (!context) throw new Error("useFavoritos debe usarse dentro de FavoritosProvider");
    return context;
}
