import { useParams } from "react-router-dom"
import useTasks from "../hooks/useTasks";
export default function TaskDetail() {
    const { id } = useParams();
    const { tasks } = useTasks();

    //cerco con il find la task specifica
    const currentTask = tasks.find(t => t.id == id);
    return (
        <>
            <h1>{currentTask && currentTask.title}</h1>
            <p>{currentTask && currentTask.description}</p>
            <p>{currentTask && currentTask.status}</p>
            <p>{currentTask && new Date(currentTask.createdAt).toLocaleString('it-IT', {
                dateStyle: 'short',
                timeStyle: 'short'
            })}</p>
            <button onClick={() => console.log("Elimino task")}>
                Elimina Task
            </button>
        </>

    )
}