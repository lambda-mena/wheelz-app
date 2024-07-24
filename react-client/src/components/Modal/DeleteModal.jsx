import React from 'react';
import { Modal, Button } from "flowbite-react";

const DeleteModal = ({ isOpen, onClose, onDelete,userName }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Borrar usuario</Modal.Header>
            <Modal.Body>
                <p className="text-center"> ¿Estás seguro de que quieres eliminar a {userName}?</p>
            </Modal.Body>
            <Modal.Footer className="flex justify-center space-x-2">
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
                <Button color="failure" onClick={onDelete}>Borrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
