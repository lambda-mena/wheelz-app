import React from 'react';
import { TextInput, Button } from "flowbite-react";

const SearchBar = ({ searchTerm, onSearchChange, onAddClick }) => {
    return (
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <TextInput
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="mb-2 sm:mb-0 sm:max-w-xs"
            />
            <Button onClick={onAddClick} className="flex items-center">
                Add User
            </Button>
        </div>
    );
};

export default SearchBar;
