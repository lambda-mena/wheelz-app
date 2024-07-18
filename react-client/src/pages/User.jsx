"use client";

import React, { useState, useEffect, useCallback } from 'react';
import TableComponent from '../components/Table/TableComponent';
import SearchBar from '../components/Search/SearchBar';
import AddEditModal from '../components/Modal/AddEditModal';
import DeleteModal from '../components/Modal/DeleteModal';
import AlertComponent from '../components/Alert/AlertComponent';
import PaginationComponent from '../components/Pagination/PaginationComponent';

const UserPage = () => {
    // Datos de ejemplo de usuarios sin el campo city
    let users = [
        { id: 1, name: 'John Doe', apellido: 'Doe', email: 'john.doe@example.com', document: '123456789', userType: 'Client', status: 'Activo' },
        { id: 2, name: 'Jane Smith', apellido: 'Smith', email: 'jane.smith@example.com', document: '987654321', userType: 'Admin', status: 'Inactivo' },
        { id: 3, name: 'Alice Johnson', apellido: 'Johnson', email: 'alice.johnson@example.com', document: '5551234567', userType: 'Client', status: 'Activo' },
        { id: 4, name: 'Bob Brown', apellido: 'Brown', email: 'bob.brown@example.com', document: '5559876543', userType: 'Admin', status: 'Activo' },
        { id: 5, name: 'Charlie Davis', apellido: 'Davis', email: 'charlie.davis@example.com', document: '5555555555', userType: 'Client', status: 'Activo' },
        { id: 6, name: 'Davis', apellido: 'Lopez', email: 'charlie.davis@example.com', document: '5555555555', userType: 'Client', status: 'Activo' }
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
        setSelectedUser({ id: '', name: '', apellido: '', email: '', document: '', userType: 'Client', status: 'Active' });
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
        setAlert({ show: true, message: '¡Usuario eliminado exitosamente!', type: 'success' }); // Muestra alerta de éxito
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
        setAlert({ show: true, message: `Usuario ${mode === 'add' ? 'agregado' : 'actualizado'} exitosamente!`, type: 'success' }); // Muestra alerta de éxito
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
        <div className="max-w-[90vw] mx-auto flex flex-col">
            {alert.show && (
                <AlertComponent
                    type={alert.type === 'success' ? 'success' : 'failure'}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
            <h1 className="text-3xl my-4">Gestión de Usuarios</h1>
            <div className="mb-4">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onAddClick={handleAddClick} />
            </div>
            <div className="overflow-x-auto mb-4">
                <TableComponent data={paginatedData} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            </div>
            <div className="mb-4">
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} totalUsers={data.length} onPageChange={handlePageChange} />
            </div>
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
}

export default UserPage;
