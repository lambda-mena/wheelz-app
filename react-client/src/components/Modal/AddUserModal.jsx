import React from 'react';
import { Modal, Button, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { HiMail, HiOutlineUser, HiOutlineIdentification, HiLockClosed } from "react-icons/hi";
import TextInput from '../../styled-components/Inputs/TextInput';
import SelectInput from '../../styled-components/Inputs/SelectInput';
import PassInput from '../../styled-components/Inputs/PassInput';

const AddUserModal = ({ isOpen, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const userType = ['USUARIO', 'ADMIN'];

    const submit = async (formData) => {
        // Convertir 'documento' a número
        const formattedData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            contraseña: formData.contraseña,
            documento: Number(formData.documento),  // Asegúrate de que esto se convierte correctamente
            tipoUsuario: formData.tipoUsuario
        };

        try {
            await onSave(formattedData);
            reset();
            onClose(); // Cierra el modal después de agregar el usuario
        } catch (error) {
            // Maneja el error si ocurre
            console.error("Error al agregar usuario:", error);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Agregar Usuario</Modal.Header>
            <Modal.Body>
                <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="nombre" value="Nombre" />
                            <TextInput
                                icon={<HiOutlineUser />}
                                method={register}
                                name="nombre"
                                placeholder="Nombre"
                                required
                            />
                            {errors.nombre && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                        <div>
                            <Label htmlFor="apellido" value="Apellido" />
                            <TextInput
                                icon={<HiOutlineUser />}
                                method={register}
                                name="apellido"
                                placeholder="Apellido"
                                required
                            />
                            {errors.apellido && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                        <div>
                            <Label htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                icon={<HiMail />}
                                method={register}
                                name="email"
                                placeholder="Correo Electrónico"
                                required
                            />
                            {errors.email && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                        <div>
                            <Label htmlFor="contraseña" value="Contraseña" />
                            <PassInput
                                icon={<HiLockClosed />}
                                method={register}
                                name="contraseña"
                                type="password"
                                placeholder="Contraseña"
                                required
                            />
                            {errors.contraseña && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                        <div>
                            <Label htmlFor="documento" value="Documento" />
                            <TextInput
                                icon={<HiOutlineIdentification />}
                                method={register}
                                name="documento"
                                placeholder="Documento"
                                required
                            />
                            {errors.documento && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                        <div>
                            <Label htmlFor="tipoUsuario" value="Tipo de Usuario" />
                            <SelectInput
                                method={register}
                                name="tipoUsuario"
                                required
                                values={userType}
                            />
                            {errors.tipoUsuario && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button type='submit' className="mr-2">Agregar Usuario</Button>
                        <Button color="gray" onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
