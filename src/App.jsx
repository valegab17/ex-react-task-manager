import { Routes, Route, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
function App() {
 
  return (
  <BrowserRouter>
  <Navbar/> 
  <Routes>
  <Route element={<TaskList/>} path="/" />
  <Route element={<AddTask/>} path="/add-task" />
  </Routes>
  
  
  </BrowserRouter>
  )
}

export default App
