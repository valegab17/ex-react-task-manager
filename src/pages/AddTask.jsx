import { useState, useEffect, useRef } from "react"


export default function AddTask() {
    const [title, setTitle] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    //mi creo la mia funzione handleSubmit
    const handleSubmit = (e) => {
        //blocco il caricamento della pagina
        e.preventDefault();
        //resetto il messaggio di errore a ogni invio
        setErrMsg("");

        //eseguo il primo controllo "Utente ha fatto un submit con il titolo vuoto?" 
        if (title.trim() === "") {
            setErrMsg("Non puoi lasciare il campo Nome della Task vuoto.")
            return;
        }

        //eseguo il secondo controllo. "usa dei caratteri non supportati?" 
        //Mi trasformo la stringa in un array di lettere e faccio un check con .some per verificare se almeno una è dentro symbol
        const hasSymbols = title.split('').some(char => symbols.includes(char));

        if (hasSymbols) {
            setErrMsg("Il nome della task non può contenere caratteri speciali")
            return;
        }

        //se è tutto ok recuper i dati non controllati e stampo l'oggetto 
        const taskObj = {
            title: title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }
        console.log("Nuovo task", taskObj);

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="task-title">

            <label> NOME DELLA TUA TASK: </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                /> {/* se c'è un errore lo controlliamo con lo state di errMsg mostrandolo sotto*/}
                {errMsg && <p style={{ color: 'red' }}> {errMsg}</p>}
            </div>

            <div className="task-description">
                <label> DESCRIZIONE: </label>
                <textarea ref={descriptionRef} />
            </div>
        <div className="task-state">
        <label>STATO :</label>
        <select ref={statusRef} defaultValue={"Seleziona lo stato"}>
            <option value="To do">To do </option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
        </select>
        </div>
        <button type="submit" className="submit-btn">Aggiungi Task</button>

        </form>

    )
}