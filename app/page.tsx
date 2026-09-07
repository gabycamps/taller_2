"use client";

import { useState } from "react";
import SeriesList from "@/components/SeriesList";
import SerieForm from "@/components/SerieForm";

export default function Home() {
    const [mostrarForm, setMostrarForm] = useState(false);
    // Empieza en false: el formulario arranca oculto

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted">Tu colección personal</p>
                <button
                    onClick={() => setMostrarForm((prev) => !prev)}
                    // invierte el valor actual, sin importar cuál sea
                    className="bg-accent text-background font-medium rounded px-4 py-2 hover:opacity-90 transition-opacity"
                >
                    {mostrarForm ? "Cancelar" : "+ Agregar serie"}
                </button>
            </div>

            {mostrarForm && <SerieForm onSuccess={() => setMostrarForm(false)} />}

            <SeriesList />
        </main>
    );
}