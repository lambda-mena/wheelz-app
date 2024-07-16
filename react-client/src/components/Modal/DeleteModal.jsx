import React from 'react';
import { Modal, Button } from "flowbite-react";

const DeleteModal = ({ isOpen, onClose, onDelete, userName }) => {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <Modal.Header>Delete User</Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete {userName}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button color="gray" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="failure" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
