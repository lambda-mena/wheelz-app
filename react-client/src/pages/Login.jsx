import React from 'react';
import {useForm} from 'react-hook-form';
import { Button } from 'flowbite-react';
import { HiMail , HiLockClosed } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import TextInput from '../styled-components/Inputs/TextInput';
import PassInput from '../styled-components/Inputs/PassInput';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const submit = (data) =>{
        console.log(data);
        navigate('/');
    }

    return (
        <>
            <div className='flex-1 mx-auto content-center'>
                <h1 className='block text-5xl font-bold text-center mb-9 text-cyan-700'>WheelZ</h1>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <TextInput method={register} required={true} icon={<HiMail/>} placeholder={'name@wheelz.com'} name={'email'}/>

                    <PassInput method={register} required={true} icon={<HiLockClosed/>} placeholder={'*******'} name={'pass'}/>
                    
                    <Button type="submit">Ingresar</Button>
                </form>
            </div>
        </>
    );
};

export default Login;