import React from 'react';
import { Pagination } from "flowbite-react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={totalPages}
            />
        </div>
    );
};

export default PaginationComponent;
