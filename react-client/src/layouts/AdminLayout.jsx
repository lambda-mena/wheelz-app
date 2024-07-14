import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex-1 mx-auto content-center'>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
