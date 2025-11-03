import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Start from './pages/start/Start'
import Listening from './pages/listening/Listening'
import Writing from './pages/writing/Writing'
import { AppProvider } from './components/nav/AppContext'
import Register from './pages/Register/Register'
import Admin from './pages/admin/Admin'
import Tekshirshga from './pages/admin/Tekshirshga'
import Qoshishga from './pages/admin/Qoshishga'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tekshirshga" element={<Tekshirshga />} />
          <Route path="/qoshishga" element={<Qoshishga />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
