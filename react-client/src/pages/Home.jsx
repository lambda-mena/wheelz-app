import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h1 className='block text-5xl font-bold text-center mb-9'>WheelZ Admin</h1>
      <div className='flex flex-col gap-y-2 w-1/2 mx-auto'>
        <Button as={Link} to='/vehiculos'>Gestionar Vehiculos</Button>
        <Button as={Link} to='/seguros'>Gestionar Seguros</Button>
        <Button as={Link} to='/usuarios'>Gestionar Usuarios</Button>
      </div>
    </>
  )
}
