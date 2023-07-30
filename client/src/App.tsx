import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Login from './routes/authentication/Login'
import Signup from './routes/authentication/Signup'
import AuthProvider from './contexts/AuthContext'
import './App.css'
import Preview from './routes/preview/Preview'
import DataProvider from './contexts/DataContext'

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
