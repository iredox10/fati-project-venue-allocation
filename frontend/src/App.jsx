import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Department from './pages/Department'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-blue-200 min-h-screen'>
   <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/department/:id' element={<Department />} />
    </Routes>
   </Router> 
</div>
  )
}

export default App
