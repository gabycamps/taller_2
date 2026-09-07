import Link from "next/link";
import FavoritoButton from "@/components/FavoritoButton";

export interface Serie {
    id: number;
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
}

interface SeriesCardProps {
    serie: Serie;
    onEdit: () => void;
    onDelete: () => void;
}

function SeriesCard({ serie, onEdit, onDelete }: SeriesCardProps) {
    const { title, genre, seasons, platform, rating, image, id } = serie;

    return (
        <div className="bg-surface border border-border rounded-md overflow-hidden flex flex-col">
            {/*flex-col: apila los elementos verticalmente dentro de la tarjeta */}
            {/* overflow-hidden: recorta la imagen para que respete las esquinas redondeadas del contenedor, en vez de que la imagen "se salga" con esquinas cuadradas */}
            <div className="relative">
                {image ? (
                    <img src={image} alt={title} className="w-full h-56 object-cover" />
                ) : (
                    <div className="w-full h-56 bg-border flex items-center justify-center text-muted text-sm">
                        Sin imagen
                    </div>
                    // Estado vacío intencional en vez de un espacio en blanco raro
                )}
                <span className="absolute top-2 right-2 bg-background/80 text-accent text-sm font-semibold px-2 py-1 rounded">
                    ⭐ {rating}
                </span>
                {/* La calificación flota sobre la imagen (position: absolute), en vez de competir por espacio con el texto de abajo */}
            </div>

            <div className="p-4 flex flex-col gap-1 flex-1">
                <Link href={`/series/${id}`}>
                    <h2 className="font-display text-xl leading-snug hover:text-accent transition-colors">
                        {title}
                    </h2>
                </Link>
                <p className="text-muted text-sm">
                    {genre} · {seasons} temporadas
                </p>
                <p className="text-muted text-sm mb-2">{platform}</p>

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-border">
                    {/* mt-auto: empuja este bloque al fondo de la tarjeta,así todas las tarjetas alinean sus botones aunque tengan distinta cantidad de texto arriba */}
                    <FavoritoButton serieId={id} />
                    <div className="flex gap-3 text-sm">
                        <button onClick={onEdit} className="text-muted hover:text-foreground transition-colors">
                            Editar
                        </button>
                        <button onClick={onDelete} className="text-muted hover:text-red-400 transition-colors">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SeriesCard;