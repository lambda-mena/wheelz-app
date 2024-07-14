import { Footer as FlowbiteFooter } from 'flowbite-react';
import { BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs';

export const Footer = () => {
  return (
    <FlowbiteFooter container>
      <FlowbiteFooter.LinkGroup className='justify-between w-full'>
        <FlowbiteFooter.Link className='order-1' href="#">Terms of Use</FlowbiteFooter.Link>
        <div className='flex gap-x-4 my-auto'>
          <BsFacebook size={25} />
          <BsTwitter size={25} />
          <BsInstagram size={25} />
        </div>
      </FlowbiteFooter.LinkGroup>
    </FlowbiteFooter>
  )
}
