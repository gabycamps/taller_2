"use client";
import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {

    const [storedValue, setStoredValue] = useState<T>(initialValue);

    const [hydrated, setHydrated] = useState(false);
    // Nueva bandera: nos dice "ya pasamos la hidratación, ya es seguro tocar localStorage y actualizar el estado real"

    useEffect(() => {
        // Este efecto SOLO corre en el cliente, y SOLO después de que React ya terminó de hidratar (los efectos siempre corren después del primer render, nunca durante).
        try {
            const item = localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item) as T);
            }
        } catch (error) {
            console.warn(`Error leyendo localStorage key "${key}":`, error);
        }
        setHydrated(true);
    }, [key]);

    useEffect(() => {
        if (!hydrated) return;
        // 👆 sin este chequeo, este efecto se dispararía en el primer render (cuando storedValue todavía es initialValue, antes de haber leído lo guardado)

        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Error guardando en localStorage key "${key}":`, error);
        }
    }, [key, storedValue, hydrated]);

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;