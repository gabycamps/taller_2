"use client";
import { useState } from "react";
import { useSeries, Series } from "@/context/SeriesContext";
import SearchBar from "@/components/SearchBar";
import SerieForm from "@/components/SerieForm";
import FavoritoButton from "@/components/FavoritoButton";
import Link from "next/link";

function SeriesList() {
    const { series, loading, deleteSerie } = useSeries();
    const [busqueda, setBusqueda] = useState("");
    const [serieEditando, setSerieEditando] = useState<Series | null>(null);
    // Guarda la serie completa que se está editando (no solo el id).

    if (loading) return <p>Cargando series...</p>;

    const seriesFiltradas = series.filter((serie) =>
        serie.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleDelete = (id: number, title: string) => {
        const confirmado = window.confirm(`¿Seguro que quieres eliminar "${title}"?`);
        // window.confirm() PAUSA la ejecución del código hasta que el usuario responda. Devuelve true si dio clic en "Aceptar", false si en "Cancelar".

        if (!confirmado) return;
        // Si canceló, no seguimos ejecutando nada más
        
        deleteSerie(id);
    };

    return (
        <div>
            <SearchBar onSearch={setBusqueda} />

            {serieEditando && (
                <div className="border-2 border-blue-400 rounded p-4 my-4">
                    <h3 className="font-bold mb-2">Editando: {serieEditando.title}</h3>
                    <SerieForm
                        serieEditar={serieEditando}
                        onSuccess={() => setSerieEditando(null)}
                    />
                </div>
            )}

            {seriesFiltradas.length === 0 ? (
                <p>No se encontraron series.</p>
            ) : (
                seriesFiltradas.map((serie) => (
                    <div key={serie.id}>
                        <Link href={`/series/${serie.id}`}>
                            <h2 className="hover:underline cursor-pointer">{serie.title}</h2>
                        </Link>
                        <p>{serie.genre} - {serie.seasons} temporadas</p>
                        <FavoritoButton serieId={serie.id} />
                        <button onClick={() => setSerieEditando(serie)}>Editar</button>
                        <button onClick={() => handleDelete(serie.id, serie.title)}>Eliminar</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default SerieForm;