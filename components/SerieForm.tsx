"use client";
import { useState, useEffect } from "react";
import { useSeries, Series } from "@/context/SeriesContext";

interface SerieFormData {
    title: string;
    genre: string;
    seasons: number;
    platform: string;
    rating: number;
    image: string;
    description: string;
}

const valoresIniciales: SerieFormData = {
    title: "",
    genre: "",
    seasons: 1,
    platform: "",
    rating: 0,
    image: "",
    description: "",
};


interface SerieFormProps {
    serieEditar?: Series | null;
    onSuccess?: () => void;
}

function SerieForm({ serieEditar, onSuccess }: SerieFormProps) {
    const { addSerie, updateSerie } = useSeries();
    // Sacamos la función del contexto para poder usarla al enviar el formulario

    const [form, setForm] = useState<SerieFormData>(
        serieEditar ?? valoresIniciales
        // si serieEditar existe lo usa como valor inicial. Si es null/undefined, usa
        //    valoresIniciales. Esto arranca el form ya lleno cuando se edita
    );

    const [errors, setErrors] = useState<Partial<Record<keyof SerieFormData, string>>>({});
    // Un objeto de errores con las mismas llaves que el formulario pero todas opcionales

    useEffect(() => {

        if (serieEditar) {
            setForm(serieEditar);
        }
    }, [serieEditar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            // Si el input es de tipo "number", convertimos el string a número.
            // Los inputs HTML SIEMPRE entregan e.target.value como string,
            // incluso si type="number", por eso hay que convertirlo a mano.
            [name]: type === "number" ? Number(value) : value,
        });
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};

        if (!form.title.trim()) newErrors.title = "El título es obligatorio";
        if (!form.genre.trim()) newErrors.genre = "El género es obligatorio";
        if (form.seasons < 1) newErrors.seasons = "Debe tener al menos 1 temporada";
        if (form.rating < 0 || form.rating > 10) newErrors.rating = "El rating debe estar entre 0 y 10";

        setErrors(newErrors);
        // Si el objeto de errores está vacío la validación pasó
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Sin esto, el navegador recarga la página al enviar el form

        if (!validate()) return;
        // Si hay errores no seguimos, el usuario ve los mensajes y ya

        if (serieEditar) {
            updateSerie(serieEditar.id, form);
            // actualiza la serie existente por su id
        } else{
            addSerie(form);
            // le pasa los datos al contexto, que los agrega y los persiste

            setForm(valoresIniciales);
            // Reset del formulario después de un envío exitoso
            }
        
        setErrors({});

        onSuccess?.();

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
            <div>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Nombre de la serie"
                    className="border rounded px-3 py-2 w-full"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
                <input
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    placeholder="Genero"
                    className="border rounded px-3 py-2 w-full"
                />
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
            </div>

            <div>
                <input
                    name="seasons"
                    type="number"
                    value={form.seasons}
                    onChange={handleChange}
                    placeholder="Temporadas"
                    className="border rounded px-3 py-2 w-full"
                />
                {errors.seasons && <p className="text-red-500 text-sm">{errors.seasons}</p>}
            </div>

            <input
                name="platform"
                value={form.platform}
                onChange={handleChange}
                placeholder="Plataforma (Netflix, HBO...)"
                className="border rounded px-3 py-2 w-full"
            />

            <div>
                <input
                    name="rating"
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    placeholder="Rating (0-10)"
                    className="border rounded px-3 py-2 w-full"
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
            </div>

            <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="URL de la imagen"
                className="border rounded px-3 py-2 w-full"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="border rounded px-3 py-2 w-full"
            />

            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                {serieEditar ? "Guardar cambios" : "Agregar serie"}
            </button>
        </form>
    );
}

export default SerieForm;