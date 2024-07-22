import React from 'react';
import { Table, Button, Badge } from "flowbite-react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const TableComponent = ({ data, onEdit, onDeactivate }) => {
    return (
        <div className="overflow-x-auto">
            <Table striped responsive>
                <Table.Head>
                    <Table.HeadCell className="bg-gray-200">ID</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">NOMBRE</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">APELLIDO</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">CORREO ELECTRÓNICO</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">DOCUMENTO</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">TIPO DE USUARIO</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">ESTADO</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200 text-center">Acción</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.map((item) => (
                        <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.apellido}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.document}</Table.Cell>
                            <Table.Cell>{item.userType}</Table.Cell>
                            <Table.Cell>
                                <Badge color={item.status === 'Activo' ? 'success' : 'failure'}>{item.status}</Badge>
                            </Table.Cell>
                            <Table.Cell className="flex space-x-2 items-center justify-center">
                                <Button size="xs" onClick={() => onEdit(item)} className="flex items-center border-0 hover:shadow-md">
                                    <HiOutlinePencilAlt className="h-5 w-5 mr-1" />
                                    <span className='flex items-center'>Editar</span>
                                </Button>
                                <Button size="xs" color="failure" onClick={() => onDeactivate(item)} className="border-0 hover:shadow-md flex items-center">
                                    <HiOutlineTrash className="h-5 w-5 mr-1" />
                                    <span className='flex items-center'>Dar de Baja</span>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default TableComponent;
