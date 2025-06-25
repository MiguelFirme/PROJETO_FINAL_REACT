import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './assets/Components/Routes/Navbar'
import Footer from './assets/Components/Routes/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
