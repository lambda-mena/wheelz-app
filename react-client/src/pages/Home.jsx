import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { IoCarSportSharp } from "react-icons/io5";
import { RiReservedFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { fetchUsers } from '../interceptors/UsuarioAPIConexion';  // Import the function from api.js

export default function HomePage() {
  const [totalVehiculos, setTotalVehiculos] = useState(120); // Este valor es estático por ahora
  const [totalReservas, setTotalReservas] = useState(35); // Este valor es estático por ahora
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      setTotalUsuarios(users.length);
    };

    fetchData();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-5xl font-bold text-center mb-9 text-cyan-700'>WheelZ Admin</h1>
      <div className='flex flex-col items-center gap-y-4 mb-6 justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl'>
          <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl'>
            <IoCarSportSharp className="w-16 h-16 text-cyan-700 mb-4 transition-transform transform hover:rotate-12" />
            <h2 className='text-xl font-semibold text-gray-700 mb-2 text-center'>Total Vehículos</h2>
            <p className='text-4xl font-bold text-cyan-700 mb-4'>{totalVehiculos}</p>
            <Button as={Link} to='/vehiculos' color='cyan' className='w-full py-2 text-lg font-semibold'>
              Gestionar Vehículos
            </Button>
          </div>
          <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl'>
            <RiReservedFill className="w-16 h-16 text-cyan-700 mb-4 transition-transform transform hover:rotate-12" />
            <h2 className='text-xl font-semibold text-gray-700 mb-2 text-center'>Total Reservas</h2>
            <p className='text-4xl font-bold text-cyan-700 mb-4'>{totalReservas}</p>
            <Button as={Link} to='/reservas' color='cyan' className='w-full py-2 text-lg font-semibold'>
              Gestionar Reservas
            </Button>
          </div>
          <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl'>
            <FaUsers className="w-16 h-16 text-cyan-700 mb-4 transition-transform transform hover:rotate-12" />
            <h2 className='text-xl font-semibold text-gray-700 mb-2 text-center'>Total Usuarios</h2>
            <p className='text-4xl font-bold text-cyan-700 mb-4'>{totalUsuarios}</p>
            <Button as={Link} to='/usuarios' color='cyan' className='w-full py-2 text-lg font-semibold'>
              Gestionar Usuarios
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 w-full sm:w-3/4 lg:w-1/2 mx-auto'>
        {/* Buttons for other functionalities */}
      </div>
    </div>
  );
}
