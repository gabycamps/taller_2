import Link from "next/link";

export default function SerieNotFound() {
    return (
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold">Serie no encontrada</h2>
            <p className="text-gray-600 mt-2">
                La serie que buscas no existe o fue eliminada.
            </p>
            <Link href="/" className="text-blue-500 underline mt-4 inline-block">
                Volver al inicio
            </Link>
        </div>
    );
}