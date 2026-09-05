"use client";
import {useState} from "react";

interface SerieForm{
    title: string;
    genre: string;
    seasons: number;
}

function SerieForm(){
    const [form, setForm] = useState<SerieForm>({
        title:"",
        genre:"",
        seasons: 1,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({
            ...form,           // spread para preservar valores anteriores
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form>
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Nombre de la serie"
            />
            <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Genero"
            />
        </form>
    );

}