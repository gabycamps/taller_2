"use client";
import { useState } from "react";
import { useSeries, Series } from "@/context/SeriesContext";
import SearchBar from "@/components/SearchBar";
import SerieForm from "@/components/SerieForm";
import FavoritoButton from "@/components/FavoritoButton";
import SeriesCard from "@/components/SeriesCard";
import Link from "next/link";
import Modal from "@/components/Modal";

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
                <Modal onClose={() => setSerieEditando(null)}>
                    <h3 className="font-display text-xl mb-4 text-foreground">
                        Editando: {serieEditando.title}
                    </h3>
                    <SerieForm
                        serieEditar={serieEditando}
                        onSuccess={() => setSerieEditando(null)}
                    />
                </Modal>
            )}

            {seriesFiltradas.length === 0 ? (
                <p className="text-gray-500 mt-4">No se encontraron series.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {seriesFiltradas.map((serie) => (
                        <SeriesCard
                            key={serie.id}
                            serie={serie}
                            onEdit={() => setSerieEditando(serie)}
                            onDelete={() => handleDelete(serie.id, serie.title)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SeriesList;