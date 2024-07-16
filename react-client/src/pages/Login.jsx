import React from 'react';
import {useForm} from 'react-hook-form';
import { Button } from 'flowbite-react';
import { HiMail , HiLockClosed } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import Input from '../styled-components/Input';

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
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <Input method={register} required={true} type={'email'} icon={<HiMail/>} text={'Email'} placeholder={'name@wheelz.com'} name={'email'}/>

                    <Input method={register} required={true} type={'password'} icon={<HiLockClosed/>} text={'Password'} placeholder={'*******'} name={'pass'}/>
                    
                    <Button type="submit">Ingresar</Button>
                </form>
            </div>
        </>
    );
};

export default Login;