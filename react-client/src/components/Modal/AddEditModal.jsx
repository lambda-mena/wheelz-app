import React from 'react';
import { Modal, Button, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { HiMail , HiOutlineUser , HiPhone , HiLibrary} from "react-icons/hi";
import TextInput from '../../styled-components/Inputs/TextInput';
import SelectInput from '../../styled-components/Inputs/SelectInput';


const AddEditModal = ({ isOpen, onClose, onSave, data, onChange, mode }) => {

    const { register, handleSubmit } = useForm();

    const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué'];
    const userType = ['Admin','User'];
    const status = ['Active','Inactive'];

    const submit = (data)=>{
        console.log(data);
    }

    return (
        <Modal show={isOpen} onClose={onClose}>
            
            <Modal.Header>{mode === 'add' ? 'Add User' : 'Edit User'}</Modal.Header>
            <Modal.Body>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(submit)}>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="name" value="Name" />
                        <TextInput
                            icon={<HiOutlineUser/>}
                            method={register}
                            name="name"
                            placeholder="Name" 
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            icon={<HiMail/>}
                            method={register}
                            name="email"
                            placeholder="Email"
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" value="Phone" />
                        <TextInput
                            icon={<HiPhone/>}
                            method={register}
                            name="phone"
                            placeholder="Phone"
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="city" value="City" />
                        <SelectInput
                            method={register}
                            name="city"
                            required={true}
                            values={cities}
                        />
                    </div>
                    <div>
                        <Label htmlFor="address" value="Address" />
                        <TextInput
                            icon={<HiLibrary/>}
                            method={register}
                            name="address"
                            placeholder="Address"
                            required={true}
                        />
                    </div>
                    <div>
                        <Label htmlFor="userType" value="User Type" />
                        <SelectInput
                            method={register}
                            name="userType"
                            required={true}
                            values={userType}
                        />
                    </div>
                    <div>
                        <Label htmlFor="status" value="Status" />
                        <SelectInput
                            method={register}
                            name="status"
                            required={true}
                            values={status}
                        />
                    </div>
                </div>
                <Button type='submit'>{mode === 'add' ? 'Add User' : 'Update User'}</Button>
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                
                
            </Modal.Footer>
            
        </Modal>
    );
};

export default AddEditModal;
