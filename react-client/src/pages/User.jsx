import React, { useState, useEffect, useCallback } from 'react';
import TableComponent from '../components/Table/TableComponent';
import SearchBar from '../components/Search/SearchBar';
import DeactivateModal from '../components/Modal/DeactivateModal';
import AddUserModal from '../components/Modal/AddUserModal';
import EditUserModal from '../components/Modal/EditUserModal';
import AlertComponent from '../components/Alert/AlertComponent';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import { fetchUsers, deactivateUser, addUser, updateUser } from '../interceptors/UsuarioAPIConexion';


const UserPage = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const itemsPerPage = 3;

    // Función para cargar usuarios desde la API
    const loadUsers = useCallback(async () => {
        try {
            const users = await fetchUsers();
            console.log('Usuarios cargados desde la API:', users);
            setData(users);
            setFilteredData(users);
            setTotalPages(Math.ceil(users.length / itemsPerPage));
        } catch (err) {
            console.error('Error al cargar usuarios:', err);
            setAlert({ show: true, message: err.message, type: 'failure' });
        }
    }, []);
    
    // Cargar usuarios al montar el componente
    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Filtrar usuarios en función del término de búsqueda
    useEffect(() => {
        console.log('Término de búsqueda:', searchTerm);
        console.log('Datos originales:', data);
        
        const filtered = data.filter(user => {
            if (!user || (typeof user.name !== 'string' && typeof user.apellido !== 'string' && typeof user.document !== 'number')) {
                console.log('Usuario inválido:', user);
                return false;
            }
            const fullName = `${user.name} ${user.apellido}`.trim().toLowerCase();
            const document = user.document.toString();
            const searchTermLower = searchTerm.trim().toLowerCase();
            
            const isMatchName = fullName.includes(searchTermLower);
            const isMatchDocument = document.includes(searchTermLower);
            
            console.log(`Usuario: ${fullName}, Documento: ${document}, Coincide: ${isMatchName || isMatchDocument}`);
            
            return isMatchName || isMatchDocument;
        });
        
        console.log('Datos filtrados:', filtered);
        
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchTerm, data]);

    // Manejar el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Abrir el modal para desactivar un usuario
    const handleDeactivateClick = useCallback((user) => {
        if (user && user.id) {
            setSelectedUser(user);
            setIsDeactivateModalOpen(true);
        }
    }, []);

    // Confirmar y ejecutar la desactivación de un usuario
    const handleDeactivateConfirm = async () => {
        if (!selectedUser?.id) {
            setAlert({ show: true, message: 'No se ha seleccionado ningún usuario para desactivar.', type: 'failure' });
            return;
        }
        try {
            await deactivateUser(selectedUser.id);
            // Actualiza el estado con los datos del usuario desactivado
            const updatedData = data.map(user =>
                user.id === selectedUser.id ? { ...user, status: 'Inactivo' } : user
            );
            setData(updatedData);
            setFilteredData(updatedData);
            setTotalPages(Math.ceil(updatedData.length / itemsPerPage));
            setAlert({ show: true, message: '¡Usuario desactivado exitosamente!', type: 'success' });
        } catch (err) {
            setAlert({ show: true, message: err.message, type: 'failure' });
        } finally {
            handleCloseModal(); // Llamar a handleCloseModal para actualizar los datos
        }
    };

    // Abrir el modal para agregar un nuevo usuario
    const handleAddClick = useCallback(() => {
        setIsAddUserModalOpen(true);
    }, []);

    // Guardar un nuevo usuario y recargar la lista
    const handleSaveUser = async (newUser) => {
        try {
            await addUser(newUser);
            setAlert({ show: true, message: '¡Usuario agregado exitosamente!', type: 'success' });
            await loadUsers(); // Recargar la lista de usuarios
        } catch (error) {
            setAlert({ show: true, message: error.message, type: 'failure' });
        } finally {
            handleCloseModal(); // Llamar a handleCloseModal para actualizar los datos
        }
    };

    // Abrir el modal para editar un usuario
    const handleEditClick = useCallback((user) => {
        if (user && user.id) {
            setSelectedUser(user);
            setIsEditUserModalOpen(true);
        }
    }, []);

    // Actualizar los datos de un usuario
    const handleUpdateUser = async (updatedData) => {
        try {
            await updateUser(updatedData.id, updatedData); // Llamada a la API para actualizar el usuario
            // Actualiza el estado con los datos del usuario actualizado
            const updatedUserList = data.map(user =>
                user.id === updatedData.id ? { ...user, ...updatedData } : user
            );
            setData(updatedUserList);
            setFilteredData(updatedUserList);
            setTotalPages(Math.ceil(updatedUserList.length / itemsPerPage));
            setAlert({ show: true, message: '¡Usuario actualizado exitosamente!', type: 'success' });
        } catch (error) {
            setAlert({ show: true, message: error.message, type: 'failure' });
        } finally {
            handleCloseModal(); // Llamar a handleCloseModal para actualizar los datos
        }
    };

    // Función para cerrar modales y recargar usuarios
    const handleCloseModal = async () => {
        setIsDeactivateModalOpen(false);
        setIsAddUserModalOpen(false);
        setIsEditUserModalOpen(false);
        await loadUsers(); // Recargar la lista de usuarios después de cerrar un modal
    };

    // Calcular los datos de la página actual para la paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="max-w-[90vw] mx-auto flex flex-col">
            {alert.show && (
                <AlertComponent
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(prevAlert => ({ ...prevAlert, show: false }))}
                />
            )}
            <h1 className="text-3xl my-4">Gestión de Usuarios</h1>
            <div className="mb-4">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onAddClick={handleAddClick}
                />
            </div>
            <div className="overflow-x-auto mb-4">
                <TableComponent 
                    data={paginatedData} 
                    onDeactivate={handleDeactivateClick}
                    onEdit={handleEditClick}
                />
            </div>
            <div className="mb-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalUsers={filteredData.length}
                    onPageChange={handlePageChange}
                />
            </div>
            {isDeactivateModalOpen && (
                <DeactivateModal
                    isOpen={isDeactivateModalOpen}
                    onClose={handleCloseModal}
                    onDeactivate={handleDeactivateConfirm}
                    userName={selectedUser?.nombre}
                />
            )}
            {isAddUserModalOpen && (
                <AddUserModal
                    isOpen={isAddUserModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveUser}
                />
            )}
            {isEditUserModalOpen && (
                <EditUserModal
                    isOpen={isEditUserModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleUpdateUser}
                    userId={selectedUser?.id}
                />
            )}
        </div>
    );
};

export default UserPage;
