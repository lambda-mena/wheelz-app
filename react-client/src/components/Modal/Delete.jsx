import { Modal, Button } from "flowbite-react";

export const DeleteModal = ({ isOpen, onClose, onDelete, entityId, entityName }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Borrar {entityName}</Modal.Header>
      <Modal.Body>
        <p className="text-center"> ¿Estás seguro de que quieres eliminar a {entityId}?</p>
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