import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import { ProtectedRoute } from './components/Routes/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import ReservationsPage from './pages/Reservations'
import ErrorPage from './pages/Error404'
import VehiclePage from './pages/Vehicle'
import HomePage from './pages/Home'
import UserPage from './pages/User'
import Login from './pages/Login'
import React from 'react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />} path='/' errorElement={<ErrorPage />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path='/reservas' element={<ReservationsPage />} />
              <Route path='/usuarios' element={<UserPage />} />
              <Route path='/vehiculos' element={<VehiclePage />} />
            </Route >
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
