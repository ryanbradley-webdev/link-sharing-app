import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home'
import Login from './routes/authentication/Login'
import Signup from './routes/authentication/Signup'
import AuthProvider from './contexts/AuthContext'
import Preview from './routes/preview/Preview'
import DataProvider from './contexts/DataContext'
import User from './routes/user/User'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/preview' element={<Preview />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/:user' element={<User />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
