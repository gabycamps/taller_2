"use client";
import { useState } from "react";

interface LoginFormProps{
    onSubmit: (data: {email: string, password: string}) => void;
}

function LoginForm({onSubmit}: LoginFormProps){
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({email:"", password: ""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = (): boolean => {
        const newErrors = {email: "", password: ""};
        if (!form.email.includes("@")) newErrors.email = "Email inválido";
        if (form.password.length < 6) newErrors.password = "Minimo 6 caracteres";
        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()){
            onSubmit(form);
            setForm({email: "", password: ""});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
            {errors.email && <span>{errors.email}</span>}
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
            {errors.password && <span>{errors.password}</span>}
            <button type="submit">Iniciar sesión</button>
        </form>
    );

}

export default LoginForm;