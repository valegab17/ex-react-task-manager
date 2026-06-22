import { useContext, useState, useMemo, useCallback } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow.jsx"


function debounce(callback, delay){
    let timer; 
    return(value) => {
        clearTimeout(timer)
        timer = setTimeout(()=> {
            callback(value)
        }, delay)
    }
}
export default function TaskList() {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 500) ,[])
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
        const filteredAndSorteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))

        //uso il metodo sort
        filteredAndSorteredTasks.sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            } else if (sortBy === "status") {
                return a.status.localeCompare(b.status) * sortOrder;
            } else if (sortBy === "createdAt") {
                const dataA = new Date(a.createdAt).getTime();
                const dataB = new Date(b.createdAt).getTime();
                return (dataA - dataB) * sortOrder;
            }
            return 0;
        });
        return filteredAndSorteredTasks
    }, [tasks, sortBy, sortOrder, searchQuery])



    return (
        <>

            <div className="t-title"> <h1>MEOW-LIST</h1></div>
            {/*Input di ricerca */}
            <div className="table-container">
            <input
                type="text"
                placeholder="Cerca una task..."
                onChange={e => debouncedSetSearchQuery(e.target.value)} />
                <table className="task-table">
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

            </div>
        </>
    )




}