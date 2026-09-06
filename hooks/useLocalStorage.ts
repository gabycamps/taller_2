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

    useEffect(() =>{
        // Este bloque se ejecuta cada vez que "storedValue" cambia
        // useEffect NO cambia storedValue, solo REACCIONA a que ya cambió.
        if (typeof window === "undefined") return;

        try{
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch(error){
            console.warn(`Error guardando en localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);
    // array de dependencias: vuelve a correr este efecto cada vez que key o storedValue cambien
    
    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;