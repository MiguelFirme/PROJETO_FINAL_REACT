import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inicial from './assets/Components/PaginaInicial.jsx'
import Login from './assets/Components/Login.jsx'
import Reserva from './assets/Components/Reserva.jsx'
import Signin from './assets/Components/Signin.jsx'
import Pagamento from './assets/Components/Pagamento.jsx'
import MinhasReservas from './assets/Components/Carrinho.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Inicial />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/reserva',
        element: <Reserva />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/pagamento',
        element: <Pagamento />  
      },
      {
        path: '/carrinho',
        element: <MinhasReservas />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
