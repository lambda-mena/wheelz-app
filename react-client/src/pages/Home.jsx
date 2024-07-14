import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { Button } from 'flowbite-react';

export const Home = () => {
  return (
    <main className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex-1 mx-auto content-center'>
        <h1 className='block text-5xl font-bold text-center mb-9'>WheelZ Admin</h1>
        <div className='flex flex-col gap-y-2 w-1/2 mx-auto'>
          <Button href='#'>Gestionar Vehiculos</Button>
          <Button href='#'>Gestionar Seguros</Button>
          <Button href='#'>Gestionar Usuarios</Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
