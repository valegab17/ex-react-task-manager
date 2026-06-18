import { useContext, useState, useMemo } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow.jsx"

export default function TaskList() {
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const handleSort = (col) => {
        if (sortBy === col) {
            setSortOrder(sortOrder * -1)
        } else {
            setSortBy(col);
            setSortOrder(1);
        }
    }
    const { tasks } = useContext(GlobalContext)

    //Implementare la logica di ordinamento con useMemo()
    const sortedTasks = useMemo(() => {
        const tasksCopy = [...tasks]

        //uso il metodo sort
        tasksCopy.sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            } if (sortBy === "status") {
                return a.status.localeCompare(b.status) * sortOrder;
            } if (sortBy === "createdAt") {
                const dataA = new Date(a.createdAt).getTime();
                const dataB = new Date(b.createdAt).getTime();
                return (dataA - dataB) * sortOrder;
            }



            return 0;
        });
        return tasksCopy
    }, [tasks, sortBy, sortOrder])

    return (
        <table>
            <thead>
                <tr >

                    <th onClick={() => handleSort("title")}>Nome</th>
                    <th onClick={() => handleSort("status")}>Stato</th>
                    <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
                </tr>

            </thead>
            <tbody>
                {sortedTasks.map((task) => {
                    return (
                        <TaskRow key={task.id} task={task} />
                    )
                })}


            </tbody>
        </table>
    )
}