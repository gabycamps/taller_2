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
            className="w-full bg-surface border-2 border-accent-purple/40 rounded-lg px-4 py-2 text-foreground
                    focus:outline-none focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/30"
        />
    );
}

export default SearchBar;