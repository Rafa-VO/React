import { useState, type FormEvent, type ChangeEvent } from "react";
import "./NoteForm.css";

interface NoteFormProps {
    guardarNota: (texto: string) => void;
    notaActual?: string;
}

function NoteForm({ guardarNota, notaActual = "" }: NoteFormProps) {
    const [nota, setNota] = useState(notaActual);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        guardarNota(nota);
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNota(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <h4>Nota Personal</h4>
            <textarea 
                value={nota} 
                onChange={handleChange} 
                placeholder="Escribe qué te pareció..." 
            />
            <button type="submit">Guardar Nota</button>
        </form>
    );
}

export default NoteForm;