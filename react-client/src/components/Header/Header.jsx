import { Avatar, Navbar } from 'flowbite-react';
import defaultAvatar from '../../assets/img/default-avatar.png';

export const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='/'>
        <img src='./favicon.ico' alt='wheelz-icon' />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">WheelZ</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Avatar img={defaultAvatar} alt='default-avatar' />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href='/' active>Panel de Administración</Navbar.Link>
        <Navbar.Link href='#'>Vehiculos</Navbar.Link>
        <Navbar.Link href='#'>Seguros</Navbar.Link>
        <Navbar.Link href='#'>Usuarios</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
