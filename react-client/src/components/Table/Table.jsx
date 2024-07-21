import { Button, Table as FlowbiteTable } from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";

export const Table = ({ fields, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <FlowbiteTable className="max-h-1/2" striped>
        <FlowbiteTable.Head>
          {fields.map((v, idx) => (
            <FlowbiteTable.HeadCell className="bg-gray-200" key={idx}>{v}</FlowbiteTable.HeadCell>
          ))}
          <FlowbiteTable.HeadCell className="bg-gray-200 text-center">Acción</FlowbiteTable.HeadCell>
        </FlowbiteTable.Head>
        <FlowbiteTable.Body className="divide-y">
          {data.map((entity, idx) => (
              
            <FlowbiteTable.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 transition-colors duration-200" key={idx}>
              {Object.entries(entity).map((keyValue, idxField) => {
                  console.log(keyValue)
                  if (fields.includes(keyValue[0])) {
                    return (
                      <FlowbiteTable.Cell  className={keyValue[0] === 'id' ? 'font-medium text-gray-900' : ''}  key={idxField}>
                        {keyValue[1]}
                      </FlowbiteTable.Cell>
                    )
                  }
                }
              )}
              <FlowbiteTable.Cell className="flex space-x-2 items-center justify-center">
                <Button size="xs" onClick={() => onEdit(entity)} className="flex items-center border-0 hover:shadow-md">
                    <HiOutlinePencilAlt className="h-5 w-5 mr-1" />
                    <span className='flex items-center'>Editar</span>
                </Button>
                <Button color="failure" size="xs" onClick={() => onDelete(entity)} className="border-0 hover:shadow-md flex items-center">
                    <HiTrash className="h-5 w-5 mr-1" />
                    <span className='flex items-center'>Borrar</span>
                </Button>
            </FlowbiteTable.Cell>
            </FlowbiteTable.Row>
          ))}
        </FlowbiteTable.Body>
      </FlowbiteTable>
    </div>
  );
};
