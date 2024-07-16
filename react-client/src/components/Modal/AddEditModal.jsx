import React from 'react';
import { Modal, Button, TextInput, Label } from "flowbite-react";

const AddEditModal = ({ isOpen, onClose, onSave, data, onChange, mode }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>{mode === 'add' ? 'Add User' : 'Edit User'}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            onChange={onChange}
                            required
                            className="focus:ring-0"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={onChange}
                            required
                            className="focus:ring-0"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={data.phone}
                            onChange={onChange}
                            required
                            className="focus:ring-0"
                        />
                    </div>
                    <div>
                        <Label htmlFor="city" value="City" />
                        <select id="city" name="city" value={data.city} onChange={onChange} required className="block w-full p-2 border border-gray-300 rounded">
                            <option value="">Select City</option>
                            {['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué'].map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={data.address}
                            onChange={onChange}
                            required
                            className="focus:ring-0"
                        />
                    </div>
                    <div>
                        <Label htmlFor="userType" value="User Type" />
                        <select id="userType" name="userType" value={data.userType} onChange={onChange} required className="block w-full p-2 border border-gray-300 rounded">
                            <option value="Client">Client</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="status" value="Status" />
                        <select id="status" name="status" value={data.status} onChange={onChange} required className="block w-full p-2 border border-gray-300 rounded">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onSave}>{mode === 'add' ? 'Add User' : 'Update User'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddEditModal;
