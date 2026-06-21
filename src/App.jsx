import { Routes, Route, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import Navbar from "./components/Navbar"
import GlobalContextProvider from "./context/GlobalContext"
import TaskDetail from "./pages/TaskDetail"
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <GlobalContextProvider>

        <Routes>
          <Route element={<TaskList />} path="/" />
          <Route element={<TaskDetail/>} path="/task/:id"/>
          <Route element={<AddTask />} path="/add-task" />
        </Routes>


      </GlobalContextProvider>

    </BrowserRouter>
  )
}

export default App
