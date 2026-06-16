import { createContext } from "react"
import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
//destrutturo l'hook di usetask
const {tasks, addTask,removeTask, updateTask} = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, addTask,removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    )
}