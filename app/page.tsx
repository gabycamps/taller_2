"use client";

import { useState } from "react";
import SeriesList from "@/components/SeriesList";
import SerieForm from "@/components/SerieForm";
import Modal from "@/components/Modal";

export default function Home() {
    const [mostrarForm, setMostrarForm] = useState(false);
    // Empieza en false: el formulario arranca oculto

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted">Colección personal</p>
                <button
                    onClick={() => setMostrarForm((prev) => !prev)}
                    // invierte el valor actual, sin importar cuál sea
                    className="bg-accent text-background font-medium rounded px-4 py-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                    {mostrarForm ? "Cancelar" : "+ Agregar serie"}
                </button>
            </div>

            {mostrarForm && (
                <Modal onClose={() => setMostrarForm(false)}>
                    <h2 className="font-display text-xl mb-4 text-foreground">Agregar serie</h2>
                    <SerieForm onSuccess={() => setMostrarForm(false)} />
                </Modal>
            )}

            <SeriesList />
        </main>
    );
}