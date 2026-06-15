import { memo } from "react"

function TaskRow({ task }) {

    const statusColors = {
        "To do": "red",
        "Doing": "yellow",
        "Done": "green"
    };
    return (
        <tr>
            <td> {task.title} </td>
            <td style={{ backgroundColor: statusColors[task.status] }}> {task.status} </td>
            <td>  {new Date(task.createdAt).toLocaleDateString('it-IT')} <br></br>
                {new Date(task.createdAt).toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' })} </td>

        </tr>
    )
}

export default memo(TaskRow);