import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './sections/login';
import { Dashboard } from './sections/dashboard';

function App() {
  return (
    <main className="flex items-center justify-center h-screen">
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </HashRouter>
      <ToastContainer />
    </main>
  )
}

export default App
