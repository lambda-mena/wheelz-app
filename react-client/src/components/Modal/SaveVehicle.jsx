import { SiChevrolet } from "react-icons/si";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Modal, Button, Label } from "flowbite-react";
import { HiCalendar, HiPhotograph } from "react-icons/hi";
import TextInput from "../../styled-components/Inputs/TextInput";
import NumberInput from "../../styled-components/Inputs/NumberInput";
import BooleanInput from '../../styled-components/Inputs/BooleanInput';
import SelectInput from '../../styled-components/Inputs/SelectInput';
import { IoLogoModelS } from "react-icons/io";
import { BiSolidCard } from "react-icons/bi";
import { useForm } from "react-hook-form";

export const SaveModal = ({ isOpen, onClose, onSave, data, mode, entityName, entityId }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const categorias = ['GASOLINA', 'DIESEL', 'ELECTRICO'];
  const tipoTransmision = ['AUTOMATICO', 'MANUAL'];

  const onSubmit = (data) => {
    onSave(data);
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        { mode === "add" ? `Agregar ${entityName}` : `Editar ${entityId}` }
      </Modal.Header>
      <Modal.Body>
        <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="marca" value="Marca" />
              <TextInput icon={<SiChevrolet />} method={register} name="marca" placeholder="Marca" required />
            </div>
            <div>
              <Label htmlFor="modelo" value="Modelo" />
              <TextInput icon={<IoLogoModelS />} method={register} name="modelo" placeholder="Modelo" required />
            </div>
            <div>
              <Label htmlFor="placa" value="Placa" />
              <TextInput icon={<BiSolidCard />} method={register} name="placa" placeholder="Placa" required />
            </div>
            <div>
              <Label htmlFor="categoria" value="Categoria" />
              <SelectInput method={register} name="categoria" required={true} values={categorias} />
            </div>
            <div>
              <Label htmlFor="tipoTransmision" value="Transmision" />
              <SelectInput method={register} name="tipoTransmision" required={true} values={tipoTransmision} />
            </div>
            <div>
              <Label htmlFor="imagenes" value="URL - Imagen" />
              <TextInput icon={<HiPhotograph />} method={register} name="imagenes" placeholder="imagen.jpg" required />
            </div>
            <div>
              <Label htmlFor="precioDia" value="Precio x Día" />
              <NumberInput icon={<FaMoneyCheckAlt />} method={register} name="precioDia" placeholder="2555" required />
            </div>
            <div className="flex items-center">
              <Label className="mr-2" htmlFor="disponibilidad" value="Disponibilidad" />
              <BooleanInput method={register} name="disponibilidad" placeholder="imagen.jpg" />
            </div>
            <div>
              <Label htmlFor="año" value="Año" />
              <NumberInput icon={<HiCalendar />} method={register} name="año" placeholder="2024" required />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button type="submit" className="mr-2">
              {`Guardar ${entityName}`}
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
