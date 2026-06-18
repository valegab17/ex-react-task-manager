import { useParams } from "react-router-dom"
import useTasks from "../hooks/useTasks";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
export default function TaskDetail() {
    const { id } = useParams();
    const { tasks, removeTask } = useContext(GlobalContext);
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
        </>

    )
}