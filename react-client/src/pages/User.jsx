import React, { useState, useEffect } from 'react';
import TableComponent from '../components/Table/TableComponent';
import SearchBar from '../components/Search/SearchBar';
import DeactivateModal from '../components/Modal/DeactivateModal';
import AddUserModal from '../components/Modal/AddUserModal';
import EditUserModal from '../components/Modal/EditUserModal';
import AlertComponent from '../components/Alert/AlertComponent';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import { fetchUsers, deactivateUser, addUser, updateUser } from '../api/api';

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

    const loadUsers = async () => {
        try {
            const users = await fetchUsers();
            setData(users);
            setFilteredData(users);
            setTotalPages(Math.ceil(users.length / itemsPerPage));
        } catch (err) {
            setAlert({ show: true, message: err.message, type: 'failure' });
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        const filtered = data.filter(user =>
            (user.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setCurrentPage(1);
    }, [searchTerm, data]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeactivateClick = (user) => {
        if (user && user.id) {
            setSelectedUser(user);
            setIsDeactivateModalOpen(true);
        }
    };

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
            setIsDeactivateModalOpen(false);
            setSelectedUser(null);
        }
    };

    const handleAddClick = () => {
        setIsAddUserModalOpen(true);
    };

    const handleSaveUser = async (newUser) => {
        try {
            await addUser(newUser);
            setAlert({ show: true, message: '¡Usuario agregado exitosamente!', type: 'success' });
            await loadUsers();
        } catch (error) {
            setAlert({ show: true, message: error.message, type: 'failure' });
        } finally {
            setIsAddUserModalOpen(false);
        }
    };

    const handleEditClick = (user) => {
        if (user && user.id) {
            setSelectedUser(user);
            setIsEditUserModalOpen(true);
        }
    };

    const handleUpdateUser = async (updatedData) => {
        try {
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
            setIsEditUserModalOpen(false);
        }
    };
    

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
                    onClose={() => setIsDeactivateModalOpen(false)}
                    onDeactivate={handleDeactivateConfirm}
                    userName={selectedUser?.nombre}
                />
            )}
            {isAddUserModalOpen && (
                <AddUserModal
                    isOpen={isAddUserModalOpen}
                    onClose={() => setIsAddUserModalOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
            {isEditUserModalOpen && (
                <EditUserModal
                    isOpen={isEditUserModalOpen}
                    onClose={() => setIsEditUserModalOpen(false)}
                    onSave={handleUpdateUser}
                    userId={selectedUser?.id}
                />
            )}
        </div>
    );
};

export default UserPage;
