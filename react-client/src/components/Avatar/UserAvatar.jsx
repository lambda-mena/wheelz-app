import { Avatar, Dropdown } from 'flowbite-react'
import { DefaultAvatar } from './DefaultAvatar'
import { useNavigate } from 'react-router-dom'

export const UserAvatar = ({ user, clearUser }) => {
  const navigate = useNavigate();

  const signOut = () => {
    clearUser();
    navigate('/login', { replace: true });
  }

  return user ? (
    <Dropdown arrowIcon={false} inline label={<Avatar placeholderInitials={user.charAt(0).toUpperCase()} rounded/>}>
      <Dropdown.Header>
        <span className='block text-sm'>{user}</span>
      </Dropdown.Header>
      <Dropdown.Item onClick={signOut}>Cerrar Sesión</Dropdown.Item>
    </Dropdown>
  ) : <DefaultAvatar />
}