import { Avatar, Navbar } from 'flowbite-react'
import defaultAvatar from '../../assets/img/default-avatar.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to='/'>
        <span className="self-center whitespace-nowrap text-xl font-bold text-cyan-700">WheelZ</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Avatar className='me-1' img={defaultAvatar} alt='default-avatar' />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to='/' active>Panel Administrativo</Navbar.Link>
        <Navbar.Link as={Link} to='/vehiculos'>Vehiculos</Navbar.Link>
        <Navbar.Link as={Link} to='/seguros'>Seguros</Navbar.Link>
        <Navbar.Link as={Link} to='/usuarios'>Usuarios</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
