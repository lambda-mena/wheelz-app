import { Navbar } from 'flowbite-react'
import { useAuth } from '../../hooks/useAuth'
import { UserAvatar } from '../Avatar/UserAvatar'
import { Link } from 'react-router-dom'

export const Header = () => {
  const { user, saveUserSession } = useAuth();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to='/'>
        <span className="self-center whitespace-nowrap text-xl font-bold text-cyan-700">WheelZ</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <UserAvatar user={user} clearUser={saveUserSession} />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to='/' active>Panel Administrativo</Navbar.Link>
        <Navbar.Link as={Link} to='/vehiculos'>Vehiculos</Navbar.Link>
        <Navbar.Link as={Link} to='/reservas'>Reservas</Navbar.Link>
        <Navbar.Link as={Link} to='/usuarios'>Usuarios</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
