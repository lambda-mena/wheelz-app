import { Pagination as FlowbitePagination } from "flowbite-react";

export const Pagination = ({ currentPage, totalPages, totalEntities, entityName, onPageChange, }) => {
  return (
    <div className="flex flex-col items-center px-2 md:px-4">
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-semibold">Total de {entityName}:</span> {totalEntities}
      </div>
      <FlowbitePagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        showIcons={true}
        totalPages={totalPages}
        className="max-w-[90vw] text-center sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto overflow-y-auto"
        previousLabel="Anterior"
        nextLabel="Siguiente"
      />
    </div>
  );
};
