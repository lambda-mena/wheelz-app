"use client";

import React, { useState, useEffect, useCallback } from 'react';
import TableComponent from '../components/Table/TableComponent';
import SearchBar from '../components/Search/SearchBar';
import AddEditModal from '../components/Modal/AddEditModal';
import DeleteModal from '../components/Modal/DeleteModal';
import AlertComponent from '../components/Alert/AlertComponent';
import PaginationComponent from '../components/Pagination/PaginationComponent';

const UserPage = () => {
    // Datos de ejemplo de usuarios
    let users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', city: 'Bogotá', address: '123 Street', userType: 'Client', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', city: 'Medellín', address: '456 Avenue', userType: 'Admin', status: 'Inactive' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', city: 'Cali', address: '789 Boulevard', userType: 'Client', status: 'Active' },
        { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', phone: '555-987-6543', city: 'Barranquilla', address: '101 Plaza', userType: 'Admin', status: 'Inactive' },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', phone: '555-555-5555', city: 'Cartagena', address: '202 Lane', userType: 'Client', status: 'Active' }
    ];

    // Estados para manejar los datos y la interfaz
    const [data, setData] = useState(users); // Lista de usuarios
    const [filteredData, setFilteredData] = useState(users); // Lista de usuarios filtrada
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(1); // Número total de páginas
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado del modal de eliminación
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false); // Estado del modal de agregar/editar
    const [mode, setMode] = useState('add'); // Modo del modal (agregar o editar)
    const [alert, setAlert] = useState({ show: false, message: '', type: '' }); // Estado de la alerta

    const itemsPerPage = 3; // Número de elementos por página

    // Al cargar el componente, actualizamos el total de páginas
    useEffect(() => {
        setTotalPages(Math.ceil(users.length / itemsPerPage));
    }, []);

    // Función para filtrar usuarios según el término de búsqueda
    const handleSearch = useCallback(() => {
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered); // Actualiza la lista filtrada
        setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // Actualiza el total de páginas
    }, [searchTerm, data]);

    // Efecto para manejar cambios en el término de búsqueda
    useEffect(() => {
        handleSearch();
    }, [searchTerm, data, currentPage, handleSearch]);

    // Cambia la página actual
    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Maneja el clic en el botón de agregar
    const handleAddClick = useCallback(() => {
        setSelectedUser({ id: '', name: '', email: '', phone: '', city: '', address: '', userType: 'Client', status: 'Active' });
        setMode('add');
        setIsAddEditModalOpen(true);
    }, []);

    // Maneja el clic en el botón de editar
    const handleEditClick = useCallback((user) => {
        setSelectedUser(user);
        setMode('edit');
        setIsAddEditModalOpen(true);
    }, []);

    // Maneja el clic en el botón de eliminar
    const handleDeleteClick = useCallback((user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    }, []);

    // Confirma la eliminación del usuario seleccionado
    const handleDeleteConfirm = async () => {
        setData(data.filter((user) => user.id !== selectedUser.id)); // Filtra el usuario eliminado
        setAlert({ show: true, message: 'User deleted successfully!', type: 'success' }); // Muestra alerta de éxito
        setIsDeleteModalOpen(false); // Cierra el modal de eliminación
        setSelectedUser(null);
    };

    // Guarda el usuario (agrega o actualiza según el modo)
    const handleSaveUser = async () => {
        if (mode === 'add') {
            const newUser = { ...selectedUser, id: data.length + 1 }; // Genera un nuevo ID
            setData([...data, newUser]); // Agrega el nuevo usuario
        } else {
            setData(data.map((user) => (user.id === selectedUser.id ? selectedUser : user))); // Actualiza el usuario
        }
        setAlert({ show: true, message: `User ${mode === 'add' ? 'added' : 'updated'} successfully!`, type: 'success' }); // Muestra alerta de éxito
        setIsAddEditModalOpen(false); // Cierra el modal de agregar/editar
        setSelectedUser(null);
    };

    // Maneja el cambio en los campos de entrada del modal
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setSelectedUser((prevUser) => ({ ...prevUser, [name]: value })); // Actualiza el usuario seleccionado
    }, []);

    // Calcula el índice de inicio para la paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage); // Obtiene los datos paginados

    return (
        <div className="p-4 md:p-8">
            {alert.show && (
                <AlertComponent
                    type={alert.type === 'success' ? 'success' : 'failure'}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onAddClick={handleAddClick} />
            <TableComponent data={paginatedData} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDeleteConfirm}
                    userName={selectedUser?.name}
                /> 
            )}
            {isAddEditModalOpen && (
                <AddEditModal
                    isOpen={isAddEditModalOpen}
                    onClose={() => setIsAddEditModalOpen(false)}
                    onSave={handleSaveUser}
                    data={selectedUser}
                    onChange={handleInputChange}
                    mode={mode}
                />
            )}
        </div>
    );
};

export default UserPage;
