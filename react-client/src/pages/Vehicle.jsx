import { useEffect, useState } from "react";
import { Search } from "../components/Search/Search";
import { Pagination } from "../components/Pagination/Pagination";
import { getAllVehicles, patchVehicle, putVehicle, postVehicle } from "../interceptors/VehiculoAPIConexion";
import AlertComponent from "../components/Alert/AlertComponent";
import { SaveModal } from "../components/Modal/SaveVehicle";
import { DeleteModal } from "../components/Modal/Delete";
import { Table } from "../components/Table/Table";

export default function VehiclePage() {
  // Constants
  const entityField = ["id", "marca", "modelo", "placa", "categoria"];
  const entitiesPerPage = 3;

  // React states
  const [term, setTerm] = useState("");
  const [entities, setEntities] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [totalPages, setTotalPages] = useState(Math.ceil(entities.length/entitiesPerPage));

  // Util arrow functions
  const filterRows = (rows) => rows.filter((v) => v.placa.includes(term))
  const sliceRows = (rows) => rows.slice((currentPage - 1) * entitiesPerPage, currentPage * entitiesPerPage);
  const convertToPage = (rows) => sliceRows(filterRows(rows));

  // UseEffect to refresh entities
  useEffect(() => {
    async function fetchData() {
      const savedEntities = (await getAllVehicles()).data;
      setEntities(convertToPage(savedEntities));
      setTotalPages(Math.ceil(filterRows(savedEntities).length/entitiesPerPage));
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, alert, term, openModal]);

  const showServerResponse = (response) => {
    const message = response.status === 200 ? 'Operación exitosa.' : 'Operación fallida.';
    const type = response.status === 200 ? 'success' : 'failure'
    setAlert({ show: true, message, type });
  }

  const onDelete = () => {
    patchVehicle(selectedEntity.id).then(showServerResponse);
    setSelectedEntity({});
  };

  const onSave = (entity) => {
    if (selectedEntity.id) {
      putVehicle(entity).then(showServerResponse);
    } else {
      postVehicle(entity).then(showServerResponse);
    }
    setOpenModal('');
    setSelectedEntity({});
  }

  const openSaveModal = (entity) => {
    setSelectedEntity(entity);
    setOpenModal('save');
  }

  const openDeleteModal = (entity) => {
    if (entity.active) {
      setSelectedEntity(entity);
      setOpenModal('delete');
    } else {
      setAlert({ show: true, message: 'Este vehiculo no esta activo.', type: 'failure' });
    }
  }

  return (
    <div className="max-w-[90vw] mx-auto flex flex-col">
      {alert.show && (
        <AlertComponent
          type={alert.type === 'success' ? 'success' : 'failure'}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <h1 className="text-3xl my-4">Gestión de Vehiculos</h1>
      <div className="mb-4">
        <Search term="placa" addLabel="Agregar Vehiculo" onSearchChange={setTerm} onAddClick={() => openSaveModal({})} />
      </div>
      <div className="overflow-x-auto mb-4">
        <Table fields={entityField} data={entities} onEdit={openSaveModal} onDelete={openDeleteModal} />
      </div>
      <div className="mb-4">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          entityName="vehiculos"
          totalPages={totalPages}
          totalEntities={entities.length}
        />
      </div>
      {openModal === 'delete' && <DeleteModal 
        isOpen={openModal === 'delete'} 
        onClose={() => setOpenModal('')} 
        onDelete={onDelete} 
        entityId={selectedEntity.placa} 
        entityName='Vehiculo' 
      />}
      {openModal === 'save' && <SaveModal
        isOpen={openModal === 'save'}
        onClose={() => setOpenModal('')}
        onSave={onSave}
        mode={selectedEntity.id ? 'edit' : 'add'}
        data={selectedEntity}
        entityName='Vehiculo'
        entityId={selectedEntity.placa}
      />}
    </div>
  );
}
