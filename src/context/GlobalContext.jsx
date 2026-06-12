import { createContext } from "react"
import { useState, useEffect } from "react"

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then(res => res.json())
            .then(data => {
                console.log("Dati ricevuti dal server", data);
                setTasks(data);
            })
            .catch(err => console.error("Errore nel fetch", err));
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}