import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
