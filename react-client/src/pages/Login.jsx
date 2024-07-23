import { useForm } from 'react-hook-form';
import { Button } from 'flowbite-react';
import { HiMail , HiLockClosed } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import TextInput from '../styled-components/Inputs/TextInput';
import PassInput from '../styled-components/Inputs/PassInput';
import { useAuth } from '../hooks/useAuth';
import { fetchUsers } from '../interceptors/UsuarioAPIConexion';
import { useState } from 'react';
import AlertComponent from '../components/Alert/AlertComponent';

const Login = () => {

    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const { saveUserSession } = useAuth();

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const submit = (data) =>{
        fetchUsers(data).then(res=>{
           
            if(res){
                saveUserSession(data.email);
                navigate('/');
            }else{
                
                setAlert({ show: true, message: `Usuario o contraseña incorrecta!`, type: 'failure' });
            }
        })
    }

    return (
        <>
            <div className='flex-1 mx-auto content-center'>
                <h1 className='block text-5xl font-bold text-center mb-9 text-cyan-700'>WheelZ</h1>
                {alert.show && (
                <AlertComponent
                    type={alert.type === 'success' ? 'success' : 'failure'}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <TextInput method={register} required={true} icon={<HiMail/>} placeholder={'nombre@wheelz.com'} name={'email'}/>

                    <PassInput method={register} required={true} icon={<HiLockClosed/>} placeholder={'*******'} name={'pass'}/>
                    
                    <Button type="submit">Ingresar</Button>
                </form>
            </div>
        </>
    );
};

export default Login;