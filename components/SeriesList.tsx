"use client";
import { useSeries } from "@/context/SeriesContext";

function SeriesList(){
    const {series, loading, deleteSerie} = useSeries();
    if (loading) return <p>Cargando series...</p>;

    return (
        <div>
            {series.map((serie) => (
                <div key={serie.id}>
                    <h2>{serie.title}</h2>
                    <p>{serie.genre} - {serie.seasons} temporadas</p>
                    <button onClick={() => deleteSerie(serie.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}

export default SeriesList;