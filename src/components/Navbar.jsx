import { NavLink } from "react-router-dom"
export default function Navbar() {
    return (
        <nav>
            <NavLink to="/">Task List </NavLink>
            <NavLink to="/add-task">Add Task</NavLink>
        </nav>
    )
}