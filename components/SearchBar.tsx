"use client";
import { useState, useEffect } from "react";

interface SearchBarProps{
    onSearch: (term: string) => void;
}

function SearchBar({onSearch}: SearchBarProps){
    const [termino, setTermino] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(termino);
        }, 500);

        return () => clearTimeout(timer);
    }, [termino, onSearch]);

    return(
        <input
            type="text"
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            placeholder="Buscar serie..."
        />
    );
}

export default SearchBar;