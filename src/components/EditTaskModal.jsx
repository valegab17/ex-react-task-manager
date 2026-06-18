import { useState, useRef, useEffect } from "react"
import Modal from "./Modal"

export default function EditTaskModal({ 
    show = false,
    onClose,
    task,
    onSave 
}) {
    // Inizializziamo gli stati controllati direttamente dai dati della task passata
    const [title, setTitle] = useState(task ? task.title : "")
    const [description, setDescription] = useState(task ? task.description : "")
    const [status, setStatus] = useState(task ? task.status : "To do")

    // ref per il submit del form
    const editFormRef = useRef();

    // funzione gestione submit del form
    const handleSubmit = (e) => {
        // blocco il caricamento della pagina
        e.preventDefault();
        
        // Costruiamo l'oggetto aggiornato assicurandoci che l'ID sia presente
        const updatedTask = {
            id: task?.id, 
            title,
            description,
            status
        }
        onSave(updatedTask)
    }

    // Sincronizziamo i campi del form ogni volta che la task cambia o viene caricata
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    return (
        <>
            <Modal
                show={show}
                onClose={onClose}
                title="Modifica Task"
                confirmText="Salva"
                content={(
                    <form 
                        ref={editFormRef}
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Titolo:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            Descrizione:
                            <textarea 
                                name="Inserisci qui la tua modifica"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="To do">To do</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                    </form>
                )}
                onConfirm={() => editFormRef.current?.requestSubmit()}
            />
        </>
    )
}