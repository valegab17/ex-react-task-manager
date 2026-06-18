import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import useTasks from "../hooks/useTasks";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask , updateTask} = useContext(GlobalContext);
    //cerco con il find la task specifica
    const currentTask = tasks.find(t => t.id == id);
    //mi faccio una var navigate per reinderizzare il delete
    const navigate = useNavigate();
    //faccio funzione handleDelete
    const handleDelete = async () => {
        try {
            await removeTask(id);
            //Se funziona tutto e va a buon fine
            alert("Task eliminata con successo! ");
            navigate("/");
        } catch (err) {
            alert(err.message);

        }
    }

    //faccio la mia funzione handleSaveTask
    const handleSaveTask = async (editedTask) => {
        try {
            await updateTask(editedTask)
            alert("Task modificata con successo!")

            setIsEditOpen(false);
        } catch (err) {
            alert(err.message)
        }
    }

    //setup della mia Modal
    //variabile di stato, che valore ha all'inizio la modal? 
    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false);



    return (
        <>
            <h1>{currentTask && currentTask.title}</h1>
            <p>{currentTask && currentTask.description}</p>
            <p>{currentTask && currentTask.status}</p>
            <p>{currentTask && new Date(currentTask.createdAt).toLocaleString('it-IT', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}</p>
            <button onClick={() => handleDelete()}>
                Elimina Task
            </button>
            <button onClick={() => setIsOpen(true)}>
                Elimina Task con la Modale
            </button>
            <button onClick={() => setIsEditOpen(true)}>Modifica la tua Task</button>

            <Modal
                show={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDelete}
                title="Elimina la task"
                content="Sei sicuro di voler eliminare questa task? Non potrai più tornare indietro."
            />

            <EditTaskModal
                show={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={handleSaveTask}
                task={currentTask}
            />

        </>

    )
}