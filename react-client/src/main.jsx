import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AssurancePage from './pages/Assurance'
import ErrorPage from './pages/Error404'
import VehiclePage from './pages/Vehicle'
import HomePage from './pages/Home'
import UserPage from './pages/User'
import React from 'react'
import './index.css'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/usuarios',
        element: <UserPage />
      },
      {
        path: '/vehiculos',
        element: <VehiclePage />
      },
      {
        path: '/seguros',
        element: <AssurancePage />
      },
      {
        path: '/login' ,
        element: <Login/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
