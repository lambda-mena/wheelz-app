import { Avatar } from 'flowbite-react'
import defaultAvatar from '../../assets/img/default-avatar.png'

export const DefaultAvatar = () => {
  return (
    <Avatar className='me-1' img={defaultAvatar} alt='default-avatar' />
  )
}
