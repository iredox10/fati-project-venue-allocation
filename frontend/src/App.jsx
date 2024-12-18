import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminMainPage from './pages/AdminMainPage'
import Department from './pages/Department'
import Level from './pages/Level'
import Classes from './pages/Classes'
import Students from './pages/Students'
import LoginPage from './pages/Login'
import StudentPage from './pages/StudentPage'
import AdminLogin from './pages/AdminLogin'
import Venues from './pages/venues'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' min-h-screen'>
   <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/admin' element={<AdminMainPage />} />
      <Route path='/departments' element={<Admin />} />
      <Route path='/venues' element={<Venues />} />
      <Route path='/department/:id' element={<Department />} />
      <Route path='/level/:level' element={<Level />} />
      <Route path='/department/classes/:id' element={<Classes />} />
      <Route path='/department/students/:id' element={<Students />} />

      <Route path='/login' element={<LoginPage />} />
      <Route path='/student-page/:id' element={<StudentPage />} />
    </Routes>
   </Router> 
</div>
  )
}

export default App
