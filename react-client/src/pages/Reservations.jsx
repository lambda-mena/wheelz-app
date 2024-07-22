import React , {useState , useEffect} from 'react'
import {TextInput , Label ,Datepicker , Button} from 'flowbite-react'
import { Table } from '../components/Table/Table'
import { Search } from '../components/Search/Search';
import { Pagination } from 'flowbite-react';
import { SaveModal } from '../components/Modal/SaveVehicle';
import AlertComponent from '../components/Alert/AlertComponent';
import ReservationModal from '../components/Modal/ReservationModal'
import { getAllVehicles } from '../interceptors/VehiculoAPIConexion';
import { getAllCoverturas } from '../interceptors/CoverturaAPIConexion';
import { getAllUsers } from '../interceptors/UsuarioAPIConexion';
import { getAllReserva , postReserva } from '../interceptors/ReservaAPIConexion';


export default function ReservationsPage() {
  //Constants
  const reservationFields = ['id' , 'idUsuario' , 'idcarro' , 'fechaEntrega' , 'fechaDevolucion' , 'idTipoCobertura' , 'estadoReserva' , 'precioTotal'];
  const sampleReservations = [
    { id: 1, covertura: 'WRT-241', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 2, covertura: 'WRT-242', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 3, covertura: 'WRT-243', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 4, covertura: 'WRT-244', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 5, covertura: 'WRT-245', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 6, covertura: 'WRT-246', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 7, covertura: 'WRT-247', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 8, covertura: 'WRT-248', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'}
  ]
  const entitiesPerPage = 3;

  //React states
  const [term, setTerm] = useState("");
  const [entities, setEntities] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [totalPages, setTotalPages] = useState(Math.ceil(entities.length/entitiesPerPage));
  const [cars,setCars] = useState([]);
  const [covertura,setCovertura] = useState([]);
  const [user,setUser] = useState([]);

  // Util arrow functions
  const filterRows = (rows) => rows.filter((v) => v.estadoReserva.includes(term))
  const sliceRows = (rows) => rows.slice((currentPage - 1) * entitiesPerPage, currentPage * entitiesPerPage);
  const convertToPage = (rows) => sliceRows(filterRows(rows));

  //UseEffect to search items
  useEffect(()=>{ 
    const searchCars = async ()=>{
      const responseCars = (await getAllVehicles()).data;
      setCars(responseCars);
    }
    searchCars();
  },[])

  useEffect(()=>{
    const searchCovertura = async ()=>{
      const responseCovertura = (await getAllCoverturas()).data;
      setCovertura(responseCovertura);
    }
    searchCovertura();
  },[])

  useEffect(()=>{
    const searchUser = async ()=>{
      const responseUser = (await getAllUsers()).data;
      setUser(responseUser);
    }
    searchUser();
  },[])

  // UseEffect to refresh entities
  useEffect(() => {
    async function fetchData() {
      const savedEntities = (await getAllReserva()).data;
      setEntities(convertToPage(savedEntities));
      setTotalPages(Math.ceil(filterRows(savedEntities).length/entitiesPerPage));
    }
    fetchData();
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

  const onSave = (data) => {
    console.log(data);
    postReserva(data).then(res=>{
        console.log(res);
        setOpenModal('');
        setSelectedEntity({});
    })
    
  }

  const openSaveModal = (sampleReservations) => {
    setSelectedEntity(sampleReservations);
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
        <h1 className="text-3xl my-4">Reservaciones</h1>
        <div className="mb-4">
          <Search term="estatus" addLabel="Hacer reservación" onSearchChange={setTerm} onAddClick={() => openSaveModal({})} />
        </div>
        <div className="overflow-x-auto mb-4">
          <Table fields={reservationFields} data={entities} onEdit={openSaveModal} onDelete={openDeleteModal}/>
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
          entityName='Reservación' 
        />}
      {openModal === 'save' && <ReservationModal
          isOpen={openModal === 'save'}
          onClose={() => setOpenModal('')}
          onSave={onSave}
          mode={selectedEntity.id ? 'edit' : 'add'}
          data={selectedEntity}
          entityName='Reservación'
          entityId={selectedEntity.placa}
          cars={cars}
          covertura={covertura}
          user={user}
        />}
    </div>
    
  )
}
