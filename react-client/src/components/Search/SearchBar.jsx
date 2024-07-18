import React from 'react';
import { TextInput, Button } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";

const SearchBar = ({ searchTerm, onSearchChange, onAddClick }) => {
    return (
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
            <div className="flex flex-col sm:flex-row w-full justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <TextInput
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full max-w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                />
                <Button
                    onClick={onAddClick}
                    className="w-full sm:w-auto flex items-center justify-center max-w-[90vw] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
                >
                    <HiUserAdd className="mr-2 h-5 w-5" />
                    Agregar Usuario
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
