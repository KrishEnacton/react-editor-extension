import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './sections/Dashboard/index'
import Login from './sections/Login'

function App() {
  return (
    <main>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
      <ToastContainer />
    </main>
  )
}

export default App
