import { Route, BrowserRouter as Router , Routes } from 'react-router-dom'
import './App.css'
import { Login } from './Components/Auth/Login'
import { Register } from './Components/Auth/Register'

function App() {

  return (
    <>
      {/* <Register /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
