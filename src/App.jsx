import { Routes, Route, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
import GlobalContextProvider from "./context/GlobalContext"
function App() {
 
  return (
  <BrowserRouter>
  <Navbar/> 
  <GlobalContextProvider>

  <Routes>
  <Route element={<TaskList/>} path="/" />
  <Route element={<AddTask/>} path="/add-task" />
  </Routes>
  

  </GlobalContextProvider>
  
  </BrowserRouter>
  )
}

export default App
