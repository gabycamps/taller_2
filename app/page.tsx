"use client";

import { useState } from "react";
import SeriesList from "@/components/SeriesList";
import SerieForm from "@/components/SerieForm";

export default function Home() {
    const [mostrarForm, setMostrarForm] = useState(false);
    // Empieza en false: el formulario arranca oculto

    return (
        <main className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Mis Series</h1>
                <button
                    onClick={() => setMostrarForm((prev) => !prev)}
                    // invierte el valor actual, sin importar cuál sea
                    className="bg-blue-500 text-white rounded px-4 py-2"
                >
                    {mostrarForm ? "Cancelar" : "+ Agregar serie"}
                </button>
            </div>

            {mostrarForm && <SerieForm onSuccess={() => setMostrarForm(false)} />}

            <SeriesList />
        </main>
    );
}