import React from 'react';
import { Pagination } from "flowbite-react";

const PaginationComponent = ({ currentPage, totalPages, totalUsers, onPageChange }) => {
    return (
        <div className="flex flex-col items-center px-2 md:px-4">
            <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Total de usuarios:</span> {totalUsers}
            </div>
            <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={totalPages}
                className="max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
                previousLabel='Anterior'
                nextLabel='Siguiente'
            />
        </div>
    );
};

export default PaginationComponent;
