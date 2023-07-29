import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Login from './routes/authentication/Login'
import Signup from './routes/authentication/Signup'
import AuthProvider from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
