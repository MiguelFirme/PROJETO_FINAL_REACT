import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './assets/Components/Login.jsx'
import Reserva from './assets/Components/Reserva.jsx'
import Signin from './assets/Components/Signin.jsx'
import Pagamento from './assets/Components/Pagamento.jsx'
import MinhasReservas from './assets/Components/Carrinho.jsx'
import PerfilDeUsuario from './assets/Components/PerfilDeUsuario.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [      
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
      },
      {
        path: '/perfil',
        element: <PerfilDeUsuario />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
