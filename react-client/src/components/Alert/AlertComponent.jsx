import React, { useEffect } from 'react';
import { Alert } from "flowbite-react";

const AlertComponent = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1600); // Ajusta el tiempo según tus necesidades, aquí son 3000 ms = 3 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Alert color={type} className="mb-4">
            {message}
        </Alert>
    );
};

export default AlertComponent;
