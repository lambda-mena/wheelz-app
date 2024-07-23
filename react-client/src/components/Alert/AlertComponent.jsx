import React, { useEffect } from 'react';
import { Alert } from "flowbite-react";

const AlertComponent = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); // Ajusta el tiempo según tus necesidades, aquí son 1600 ms = 1.6 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="flex justify-center">
            <Alert color={type} className="mb-4 max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                {message}
            </Alert>
        </div>
    );
};

export default AlertComponent;
