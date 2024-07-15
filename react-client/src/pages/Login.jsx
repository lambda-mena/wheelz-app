import React from 'react';
import { Label , TextInput , Button } from 'flowbite-react';
import { HiMail , HiLockClosed } from "react-icons/hi";

const Login = () => {
    return (
        <>
            <div className='flex-1 mx-auto content-center'>
                <form className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" icon={HiMail} type="email" placeholder="name@wheelz.com" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput id="password1" icon={HiLockClosed}  type="password" required />
                    </div>
                    <Button type="submit">Ingresar</Button>
                </form>
            </div>
        </>
    );
};

export default Login;