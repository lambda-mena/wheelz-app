import React from 'react';
import { Modal, Button } from "flowbite-react";

const DeactivateModal = ({ isOpen, onClose, onDeactivate, userName }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Dar de Baja Usuario</Modal.Header>
            <Modal.Body>
                <p className="text-center">
                    ¿Estás seguro de que quieres dar de baja a {userName}?
                </p>
            </Modal.Body>
            <Modal.Footer className="flex justify-center space-x-2">
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
                <Button color="failure" onClick={onDeactivate}>
                    Dar de Baja
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeactivateModal;
