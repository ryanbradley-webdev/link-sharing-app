import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Login from './routes/authentication/Login'
import Signup from './routes/authentication/Signup'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
    </Routes>
  )
}

export default App
