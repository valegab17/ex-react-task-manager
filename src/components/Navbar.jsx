import { NavLink } from "react-router-dom"
export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" > Torna alla Homepage</NavLink>
            <NavLink to="/task-list">Task List </NavLink>
            <NavLink to="/add-task">Add Task</NavLink>
        </nav>
    )
}