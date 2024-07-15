import errorImage from '../assets/img/error-image.png'
import { Link } from 'react-router-dom'

export default function ErrorPage () {
  return (
    <div className='flex min-h-screen'>
      <div className='mx-auto content-center'>
        <img className="text-center mx-auto" src={errorImage} width={240} alt="error-image" />
        <p className="text-center text-xl font-bold">¡Parece que has encontrado un error desconocido, no olvides reportarlo!</p>
        <div className='text-center mt-2'>
          <Link className='font-bold underline' to='/'>Regresar a Inicio</Link>
        </div>
      </div>
    </div>
  )
}
