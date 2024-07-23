import axios from 'axios';
const apiUrl = 'https://devps-production.up.railway.app/api/usuario';

// Obtener todos los usuarios
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/all`);
        return response.data.map(user => ({
            id: user.id,
            name: user.nombre,
            apellido: user.apellido,
            email: user.email,
            document: user.documento,   
            userType: user.tipoUsuario,
            status: user.active ? 'Activo' : 'Inactivo'
        }));
    } catch (err) {
        console.error('Error en fetchUsers:', err.response ? err.response.data : err.message);
        throw new Error('Error al obtener los datos de los usuarios: ' + (err.response ? err.response.data.message : err.message));
    }
};

// Desactivar un usuario
export const deactivateUser = async (userId) => {
    try {
        if (!userId) {
            throw new Error('ID de usuario no proporcionado.');
        }
        const response = await axios.patch(`${apiUrl}/${userId}`, { active: false });
        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Error inesperado al desactivar el usuario.');
        }
        return 'Usuario desactivado exitosamente'; // Mensaje de éxito
    } catch (err) {
        console.error('Error en deactivateUser:', err.response ? err.response.data : err.message);
        throw new Error('Error al desactivar el usuario: ' + (err.response ? err.response.data.message : err.message));
    }
};

// Agregar un nuevo usuario
export const addUser = async (user) => {
    try {
        const { nombre, apellido, email, contraseña, documento, tipoUsuario } = user;
        if (!nombre || !apellido || !email || !contraseña || documento === undefined || !tipoUsuario) {
            throw new Error('Faltan datos requeridos.');
        }
        const requestBody = { nombre, apellido, email, contraseña, documento, tipoUsuario };
    
        const response = await axios.post(apiUrl, requestBody);
        if (response.status !== 200) {
            throw new Error('Error inesperado al agregar el usuario.');
        }
        return 'Usuario agregado exitosamente'; // Mensaje de éxito
    } catch (err) {
        console.error('Error en addUser:', err.response ? err.response.data : err.message);
        throw new Error(err.response?.data?.message || 'Error inesperado al agregar el usuario.');
    }
};

// Actualizar un usuario existente
export const updateUser = async (userId, updatedData) => {
    try {
        if (!userId) {
            throw new Error('ID de usuario no proporcionado.');
        }

        // Crea el cuerpo de la solicitud solo con los campos necesarios
        const requestBody = {
            nombre: updatedData.nombre,
            apellido: updatedData.apellido,
            email: updatedData.email,
            ...(updatedData.contraseña && { contraseña: updatedData.contraseña }),
            documento: updatedData.documento
        };

        const response = await axios.put(`${apiUrl}/${userId}`, requestBody);
        if (response.status !== 200) {
            throw new Error('Error inesperado al actualizar el usuario.');
        }
        return response; // Mensaje de éxito
    } catch (err) {
        console.error('Error en updateUser:', err.response ? err.response.data : err.message);
        throw new Error(err.response?.data?.message || 'Error inesperado al actualizar el usuario.');
    }
};


// Obtener un usuario por su ID
export const fetchUserById = async (userId) => {
    try {
        if (!userId) {
            throw new Error('ID de usuario no proporcionado.');
        }
        const response = await axios.get(`${apiUrl}/${userId}`);
        if (response.status !== 200) {
            throw new Error('Error inesperado al obtener el usuario.');
        }
        const user = response.data;
        return {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            documento: user.documento,
            tipoUsuario: user.tipoUsuario,
            active: user.active ? 'Activo' : 'Inactivo'
        };
    } catch (err) {
        console.error('Error en fetchUserById:', err.response ? err.response.data : err.message);
        throw new Error(err.response?.data?.message || 'Error inesperado al obtener el usuario.');
    }
};


// Activar un usuario
export const activateUser = async (userId) => {
    try {
        if (!userId) {
            throw new Error('ID de usuario no proporcionado.');
        }
        const response = await axios.patch(`${apiUrl}/activar/${userId}`, { active: true });
        if (response.status !== 200) {
            throw new Error('Error inesperado al activar el usuario.');
        }
        return 'Usuario activado exitosamente'; // Mensaje de éxito
    } catch (err) {
        console.error('Error en activateUser:', err.response ? err.response.data : err.message);
        throw new Error('Error al activar el usuario: ' + (err.response ? err.response.data.message : err.message));
    }
};
