import React from 'react';
import { Modal, Button, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { HiMail, HiOutlineUser, HiOutlineIdentification } from "react-icons/hi";
import TextInput from '../../styled-components/Inputs/TextInput';
import SelectInput from '../../styled-components/Inputs/SelectInput';

const AddEditModal = ({ isOpen, onClose, onSave, data, onChange, mode }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: data,
    });

    const userType = ['Cliente', 'Administrador'];
    const status = ['Activo', 'Inactivo'];

    const submit = (formData) => {
        onSave(formData);
    };

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>{mode === 'add' ? 'Agregar Usuario' : 'Editar Usuario'}</Modal.Header>
            <Modal.Body>
                <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="name" value="Nombre" />
                            <TextInput
                                icon={<HiOutlineUser />}
                                method={register}
                                name="name"
                                placeholder="Nombre"
                                required={true}
                            />
                        </div>
                        <div>
                            <Label htmlFor="apellido" value="Apellido" />
                            <TextInput
                                icon={<HiOutlineUser />}
                                method={register}
                                name="apellido"
                                placeholder="Apellido"
                                required={true}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                icon={<HiMail />}
                                method={register}
                                name="email"
                                placeholder="Correo Electrónico"
                                required={true}
                            />
                        </div>
                        <div>
                            <Label htmlFor="document" value="Documento" />
                            <TextInput
                                icon={<HiOutlineIdentification />}
                                method={register}
                                name="document"
                                placeholder="Documento"
                                required={true}
                            />
                        </div>
                        <div>
                            <Label htmlFor="userType" value="Tipo de Usuario" />
                            <SelectInput
                                method={register}
                                name="userType"
                                required={true}
                                values={userType}
                            />
                        </div>
                        <div>
                            <Label htmlFor="status" value="Estado" />
                            <SelectInput
                                method={register}
                                name="status"
                                required={true}
                                values={status}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button type='submit' className="mr-2">{mode === 'add' ? 'Agregar Usuario' : 'Actualizar Usuario'}</Button>
                        <Button color="gray" onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditModal;
