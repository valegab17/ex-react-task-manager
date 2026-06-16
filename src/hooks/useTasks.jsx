import { useState, useEffect } from "react";

export default function useTasks() {
    //mi sposto da GlobalContext lo useState e l'import dell'api 
    const [tasks, setTasks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                //faccio la chiamata all'api con await su fetch
                const res = await fetch(`${apiUrl}/tasks`)
                //e poi lo converto in notazione json
                const data = await res.json()

                setTasks(data);
            } catch (err) {
                //faccio error handling con catch
                console.error("Errore nel fetch", err)
            }
        }
        fetchTasks();
    },  []);

    //definisco le tre funzioni vuote richieste dalla milestone 4 
    const addTask = () => {};
    const removeTask = () => {};
    const updateTask = () => {};
    return {tasks, addTask, removeTask,updateTask}
}