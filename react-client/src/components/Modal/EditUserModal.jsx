import React, { useEffect, useState } from 'react';
import { Modal, Button, Label } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { HiMail, HiOutlineUser, HiOutlineIdentification, HiLockClosed } from 'react-icons/hi';
import TextInput from '../../styled-components/Inputs/TextInput';
import PassInput from '../../styled-components/Inputs/PassInput';
import { updateUser, fetchUserById } from '../../interceptors/UsuarioAPIConexion'; // Ajusta la ruta según sea necesario

const EditUserModal = ({ isOpen, onClose, userId, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            id: '', // Asegúrate de que el ID esté en los valores predeterminados
            nombre: '',
            apellido: '',
            email: '',
            contraseña: '',
            documento: ''
        }
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId && isOpen) {
            const loadUserData = async () => {
                setLoading(true);
                try {
                    const userData = await fetchUserById(userId);
                    if (userData) {
                        reset({
                            id: userData.id, // Asegúrate de que esto se está configurando
                            nombre: userData.nombre || '',
                            apellido: userData.apellido || '',
                            email: userData.email || '',
                            contraseña: '', // Inicialmente vacío
                            documento: userData.documento || ''
                        });
                    } else {
                        console.error('No se encontraron datos para el usuario.');
                    }
                } catch (err) {
                    console.error('Error al cargar datos del usuario:', err);
                } finally {
                    setLoading(false);
                }
            };
            loadUserData();
        }
    }, [userId, isOpen, reset]);
    

    const submit = async (data) => {
        try {
            if (data.id) { // Verifica que data.id esté definido
                const updateResult = await updateUser(data.id, {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    ...(data.contraseña && { contraseña: data.contraseña }), // Solo incluir la contraseña si está presente
                    documento: data.documento
                });
                onSave(updateResult.data);
                onClose();
            } else {
                console.error('ID del usuario no encontrado en los datos del formulario.');
            }
        } catch (err) {
            console.error('Error al actualizar el usuario:', err);
        }
    };
    

    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Editar Usuario</Modal.Header>
            <Modal.Body>
                <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                    <div className="space-y-6">
                        {/* Campo de nombre */}
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
                        {/* Campo de apellido */}
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
                        {/* Campo de email */}
                        <div>
                            <Label htmlFor="email" value="Correo Electrónico" />
                            <TextInput
                                icon={<HiMail />}
                                method={register}
                                name="email"
                                placeholder="Correo Electrónico"
                                type="email"
                                required
                            />
                            {errors.email && <span className="text-red-500">Este campo es obligatorio y debe tener un formato válido</span>}
                        </div>
                        {/* Campo de contraseña */}
                        <div>
                            <Label htmlFor="contraseña" value="Contraseña" />
                            <PassInput
                                icon={<HiLockClosed />}
                                method={register}
                                name="contraseña"
                                placeholder="Contraseña"
                                required={false} // Contraseña opcional
                            />
                        </div>
                        {/* Campo de documento */}
                        <div>
                            <Label htmlFor="documento" value="Documento" />
                            <TextInput
                                icon={<HiOutlineIdentification />}
                                method={register}
                                name="documento"
                                placeholder="Documento"
                                type="number"
                                required
                            />
                            {errors.documento && <span className="text-red-500">Este campo es obligatorio y debe ser un número</span>}
                        </div>
                    </div>
                    {/* Botones de acción */}
                    <div className="flex justify-center mt-4 gap-4">
                        <Button type='submit'>Actualizar Usuario</Button>
                        <Button color="gray" onClick={onClose}>Cancelar</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditUserModal;
