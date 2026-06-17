import { Routes, Route, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
import GlobalContextProvider from "./context/GlobalContext"
import Homepage from "./pages/Homepage"
import TaskDetail from "./pages/TaskDetail"
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <GlobalContextProvider>

        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<TaskList />} path="/task-list" />
          <Route element={<TaskDetail/>} path="/task/:id"/>
          <Route element={<AddTask />} path="/add-task" />
        </Routes>


      </GlobalContextProvider>

    </BrowserRouter>
  )
}

export default App
