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
import { getAllUsers } from '../interceptors/ReservaAPIConexion';
import { getAllReserva , postReserva } from '../interceptors/ReservaAPIConexion';
import SearchBar from '../components/Search/SearchBar';


export default function ReservationsPage() {
  //Constants
  const reservationFields = ['id' , 'idUsuario' , 'idcarro' , 'fechaEntrega' , 'fechaDevolucion' , 'idTipoCobertura' , 'estadoReserva' , 'precioTotal'];
  
  const entitiesPerPage = 3;
  const itemsPerPage = 3;

  //React states
  const [term, setTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [entities, setEntities] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [totalPages, setTotalPages] = useState(Math.ceil(entities.length/entitiesPerPage));
  const [cars,setCars] = useState([]);
  const [cobertura,setCobertura] = useState([]);
  const [user,setUser] = useState([]);
  const [allUsers,setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    const searchCobertura = async ()=>{
      const resposeCobertura = (await getAllCoverturas()).data;
      setCobertura(resposeCobertura);
    }
    searchCobertura();
  },[])

  useEffect(()=>{
    const searchUser = async ()=>{
      const responseUser = (await getAllUsers()).data;

      const activeUsers = []
      
      responseUser.forEach(element => {
        if(element.active === true){
            activeUsers.push(element);
        }}  )
      setAllUsers(responseUser);
      setUser(activeUsers);
    }

    searchUser();
  },[])

  // UseEffect to refresh entities
  useEffect(() => {
    async function fetchData() {
      const savedEntities = (await getAllReserva()).data;

      const preConfiguredEntities = [...savedEntities];
      const configuredEntities = [];

      const todosLosUsuarios = allUsers;
      const todosLosAutos = cars;
      const todasLasCoberturas = cobertura

      preConfiguredEntities.forEach(element => {

        let nameUser ,nameAuto , typeCobertura;

        for (let i = 0; i < todosLosUsuarios.length; i++) {
          const user = todosLosUsuarios[i];

          if(user.id === element.idUsuario){
              nameUser = user.email;
          }
          
        }

        for (let i = 0; i < todosLosAutos.length; i++) {
          const auto = todosLosAutos[i];

          if(auto.id === element.idcarro){
              nameAuto = auto.modelo;
          }
          
        }
        
        for (let i = 0; i < todasLasCoberturas.length; i++) {
          const cobertura = todasLasCoberturas[i];

          if(cobertura.id === element.idTipoCobertura){
              typeCobertura = cobertura.nombre;
          }
          
        }

        configuredEntities.push({...element, "idTipoCobertura": `${typeCobertura} `,
                                "idcarro": `${nameAuto}` ,"idUsuario" : `${nameUser}`})
      });
      
      setEntities(convertToPage(configuredEntities));
      setFilteredData(convertToPage(configuredEntities));
      setTotalPages(Math.ceil(filterRows(configuredEntities).length/entitiesPerPage));
    }
    fetchData();
  }, [currentPage, alert, term, openModal,allUsers]);

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
        setOpenModal('');
        setSelectedEntity({});
    })
    
  }

  const openSaveModal = (entities) => {
    //console.log(entities);
    setSelectedEntity(entities);
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

  useEffect(() => {

    const filtered = entities.filter(user => {
        if (!user || (typeof user.idUsuario !== 'string')) {
            return false;
        }
        const fullName = `${user.idUsuario}`.trim().toLowerCase();
        const searchTermLower = searchTerm.trim().toLowerCase(); 
        
        const isMatchName = fullName.includes(searchTermLower);
        
        return isMatchName
    });
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
}, [searchTerm, entities]);

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
          <SearchBar
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      onAddClick={() => openSaveModal({})}
                  />
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
            entityId={selectedEntity.idUsuario}
            cars={cars}
            cobertura={cobertura}
            user={user}
          />}
    </div>
    
  )
}
