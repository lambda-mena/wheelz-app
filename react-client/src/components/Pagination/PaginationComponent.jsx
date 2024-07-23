import React from 'react';
import { Pagination } from "flowbite-react";

const PaginationComponent = ({ currentPage, totalPages, totalUsers, onPageChange }) => {
    return (
        <div className="flex flex-col items-center w-full px-4 py-2 sm:px-6 lg:px-8">
            <div className="text-sm text-gray-700 mb-4">
                <span className="font-medium">Total de usuarios:</span> {totalUsers}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center w-full overflow-x-auto">
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={totalPages}
                        layout="pagination"
                        previousLabel="Anterior"
                        nextLabel="Siguiente"
                        className="flex flex-wrap justify-center items-center space-x-1"
                    />
                </div>
            )}
        </div>
    );
};

export default PaginationComponent;