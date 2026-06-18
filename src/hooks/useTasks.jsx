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
    }, []);

    //definisco le tre funzioni vuote richieste dalla milestone 4 
    const addTask = async (newTask) => {
        try {
            //FETCH DI POST 
            const res = await fetch(`${apiUrl}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            //ora converto la risposta in notazione JSON
            const data = await res.json();
            console.log("Cosa mi risponde il server quando aggiungo?", data);

            //facciamo il controllo sulla funzione
            if (data.success) {
                setTasks((prevTasks) => [...prevTasks, data.task]);
            } else {
                throw new Error(data.message)
            }

        } catch (err) {
            //error handling
            console.error("Errore nel fetch", err)
            throw err;
        }
    };

    const removeTask = async (taskId) => {
        try {
            //fetch di DELETE
            const res = await fetch(`${apiUrl}/tasks/${taskId}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                setTasks((prevTasks) => prevTasks.filter(t => t.id != taskId))
            } else {
                throw new Error(data.message)
            }

        } catch (err) {
            console.error("Errore nella eliminazione", err);
            throw err;
        }
    };

    const updateTask = async (updatedTask) => {
        // AGGIUNTO: il blocco try che mancava all'appello
        try {
            const res = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            })
            const data = await res.json()
            if (data.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((t) => {
                        if (t.id == updatedTask.id) {
                            return data.task
                        } else {
                            return t;
                        };
                    })
                )
            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            console.error("Errore nella modifica", err);
            throw err;
        }
    };

    return { tasks, addTask, removeTask, updateTask }
}