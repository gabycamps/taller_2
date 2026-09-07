"use client";
import { useParams, useRouter } from "next/navigation";
// useParams: lee los valores de la URL (el "[id]" de la carpeta)
// useRouter: nos deja navegar por código, por ejemplo para el botón Volver
import { notFound } from "next/navigation";


import Link from "next/link";
// El componente de Next.js para navegación interna

import { useSeries } from "@/context/SeriesContext";
import FavoritoButton from "@/components/FavoritoButton";

function SerieDetallePage() {
    const params = useParams();
    const router = useRouter();
    const { series, deleteSerie } = useSeries();

    const id = Number(params.id);
    // params.id SIEMPRE llega como string (así funcionan las URLs)

    const serie = series.find((s) => s.id === id);
    // .find() recorre el array y devuelve el PRIMER elemento que cumpla la condición, o "undefined" si ninguno cumple.

    if (!serie) {
        notFound();
    }

    const handleDelete = () => {
        const confirmado = window.confirm(`¿Seguro que quieres eliminar "${serie.title}"?`);
        if (!confirmado) return;

        deleteSerie(serie.id);
        router.push("/");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Link href="/" className="text-blue-500 underline">
                ← Volver
            </Link>

            <div className="flex gap-6 mt-4">
                {serie.image && (
                    <img src={serie.image} alt={serie.title} className="w-40 rounded" />
                )}
                <div>
                    <h1 className="text-3xl font-bold">{serie.title}</h1>
                    <FavoritoButton serieId={serie.id} />
                    <p className="text-gray-600">
                        {serie.genre} · {serie.seasons} temporadas · {serie.platform}
                    </p>
                    <p className="mt-2">⭐ {serie.rating} / 10</p>
                    <p className="mt-4">{serie.description}</p>
                </div>
            </div>

            <button
                onClick={handleDelete}
                className="mt-6 bg-red-500 text-white rounded px-4 py-2"
            >
                Eliminar serie
            </button>
        </div>
    );
}

export default SerieDetallePage;