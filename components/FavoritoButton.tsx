"use client";
import { useFavoritos } from "@/context/FavoritosContext";

function FavoritoButton({serieId}: {serieId: number}){
    const {toggleFavorito, isFavorito} = useFavoritos();

    return(
        <button onClick={() => toggleFavorito(serieId)} className="cursor-pointer">
            {isFavorito(serieId) ? "Quitar de favoritos" : "Agregar a favoritos"}
            
        </button>
    );
}

export default FavoritoButton;