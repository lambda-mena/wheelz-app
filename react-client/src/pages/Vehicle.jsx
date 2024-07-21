import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination/Pagination";
import { Search } from "../components/Search/Search";
import { Table } from "../components/Table/Table";

export default function VehiclePage() {
  // Constants
  const vehicleFields = ["id", "placa", "marca", "modelo", "categoria"];
  const sampleVehicles = [
    { id: 1, placa: 'WRT-241', marca: 'Audi', modelo: 'R8', categoria: 'GASOLINA'},
    { id: 2, placa: 'IPY-925', marca: 'Kia', modelo: 'Stylus', categoria: 'GASOLINA' },
    { id: 3, placa: 'POI-654', marca: 'Chevrolet', modelo: 'Camaro', categoria: 'GASOLINA' },
    { id: 4, placa: 'YYI-318', marca: 'Nissan', modelo: 'Sense', categoria: 'DIESEL' },
    { id: 5, placa: 'AWI-757', marca: 'Tesla', modelo: 'Y', categoria: 'ELECTRICO' },
    { id: 6, placa: 'ZWX-442', marca: 'Tesla', modelo: 'X', categoria: 'ELECTRICO' },
  ]
  const entitiesPerPage = 3;
  const totalPages = Math.ceil(sampleVehicles.length/entitiesPerPage);

  // React states
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entities, setEntities] = useState(sampleVehicles.slice(0, entitiesPerPage));

  // Util arrow function
  const convertToPage = (rows) => rows.filter((v) => v.placa.includes(term)).slice((currentPage - 1) * entitiesPerPage, currentPage * entitiesPerPage);

  // UseEffect to refresh entities
  useEffect(() => {
    setEntities(convertToPage(sampleVehicles));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, term]);

  const onEdit = (arg) => {
    console.log(arg);
  }

  const onDelete = (arg) => {
    console.log(arg);
  }

  return (
    <div className="max-w-[90vw] mx-auto flex flex-col">
      <h1 className="text-3xl my-4">Gestión de Vehiculos</h1>
      <div className="mb-4">
        <Search term="placa" addLabel="Agregar Vehiculo" onSearchChange={setTerm} />
      </div>
      <div className="overflow-x-auto mb-4">
        <Table fields={vehicleFields} data={entities} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="mb-4">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          entityName="vehiculos"
          totalPages={totalPages}
          totalEntities={sampleVehicles.length}
        />
      </div>
    </div>
  );
}
