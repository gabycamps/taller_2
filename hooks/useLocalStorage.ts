"use client";
import { useState, useEffect } from "react";


// <T> = genérico: este hook sirve para cualquier tipo de dato
function useLocalStorage<T>(key: string, initialValue: T){
    const [storedValue, setStoredValue] = useState<T>(() => {
        // Esto es "lazy initialization": la función solo se ejecuta una vez en el primer render

        // Protección SSR
        if (typeof window === "undefined") return initialValue;

        try{
            // localStorage SIEMPRE guarda strings, nunca objetos directos
            const item = localStorage.getItem(key);

            // Si había algo guardado, lo convertimos de string a objeto real (JSON.parse)
            // Si no había nada (item es null), usamos el valor por defecto
            return item ? (JSON.parse(item) as T): initialValue;
        } catch(error){
            console.warn(`Error leyendo localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
            setError(null);
            // Si guardar funcionó bien esta vez, limpiamos cualquiererror anterior
        } catch (err) {
            console.warn(`Error guardando en localStorage key "${key}":`, err);
            setError("No se pudo guardar la información. Verifica el espacio disponible.");
            // Mensaje pensado para un humano, no para un desarrollador
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue, error] as const;
    // Ahora retornamos 3 elementos en vez de 2. El tercero es opcional de usar
}

export default useLocalStorage;