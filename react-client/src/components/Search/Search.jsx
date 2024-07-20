import { TextInput, Button } from "flowbite-react";
import { HiPlus, HiSearch } from "react-icons/hi";

export const Search = ({ searchTerm, onSearchChange, onAddClick, addLabel, term }) => {
  return (
    <div className="flex flex-col min-w-[37vw] md:flex-row space-y-3 md:space-y-0 md:justify-between md:gap-x-2 mb-4">
      <TextInput
        icon={HiSearch}
        placeholder={`Buscar por ${term}...`}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full my-auto max-w-sm"
      />
      <Button onClick={onAddClick} className="flex items-center justify-center max-h-12">
        <HiPlus className="mr-1 size-6 my-auto" />
        <span className="my-auto">{addLabel}</span>
      </Button>
    </div>
  );
};
