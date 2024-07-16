import React from 'react';
import { Table, Button, Badge } from "flowbite-react";

const TableComponent = ({ data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <Table striped responsive>
                <Table.Head>
                    <Table.HeadCell className="bg-gray-200">ID</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Name</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Email</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Phone</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">City</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Address</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">User Type</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Status</Table.HeadCell>
                    <Table.HeadCell className="bg-gray-200">Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {data.map((item) => (
                        <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.phone}</Table.Cell>
                            <Table.Cell>{item.city}</Table.Cell>
                            <Table.Cell>{item.address}</Table.Cell>
                            <Table.Cell>{item.userType}</Table.Cell>
                            <Table.Cell>
                                <Badge color={item.status === 'Active' ? 'success' : 'failure'}>{item.status}</Badge>
                            </Table.Cell>
                            <Table.Cell className="flex space-x-2 items-center">
                                <Button size="xs" onClick={() => onEdit(item)} className="border-0 hover:shadow-md flex items-center">
                                    Edit
                                </Button>
                                <Button size="xs" color="failure" onClick={() => onDelete(item)} className="border-0 hover:shadow-md flex items-center justify-center">
                                    Delete
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
