import { SiChevrolet } from "react-icons/si";
import { FaCar } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { Modal, Button, Label } from "flowbite-react";
import { HiCalendar, HiPhotograph } from "react-icons/hi";
import TextInput from "../../styled-components/Inputs/TextInput";
import NumberInput from "../../styled-components/Inputs/NumberInput";
import BooleanInput from '../../styled-components/Inputs/BooleanInput';
import EnlacedSelectInput from "../../styled-components/Inputs/EnlacedSelectInput";
import SelectInput from "../../styled-components/Inputs/SelectInput";
import { IoLogoModelS } from "react-icons/io";
import { BiSolidCard } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Datepicker } from "flowbite-react";
import { useEffect } from "react";
import DateInput from "../../styled-components/Inputs/DateInput";

 const ReservationModal = ({ isOpen, onClose, onSave, data, mode, entityName, entityId , cars , cobertura , user}) => {

const configuredCars = ()=>{
    const newArray = [];
    cars.forEach(e=>{
        let item = {
            'id' : e.id,
            'name' : e.modelo
        }
        newArray.push(item);
    })
    return newArray;
}

const configuredCobertura = ()=>{
    const newArray = [];
    cobertura.forEach(e=>{
        let item = {
            'id' : e.id,
            'name' : e.nombre
        }
        newArray.push(item);
    })
    return newArray;
}

const configuredUser = ()=>{
    const newArray = [];
    user.forEach(e=>{
        let item = {
            'id' : e.id,
            'name' : e.email
        }
        newArray.push(item);
    })
    return newArray;
}

  const { register, handleSubmit } = useForm({
    defaultValues: data,
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  }

  console.log(data)

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        { mode === "add" ? `Agregar ${entityName}` : `Editar ${entityId}` }
      </Modal.Header>
      <Modal.Body>
        <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="usuario" value="Usuario" />
              <EnlacedSelectInput method={register} name="idUsuario" required={true} values={configuredUser()} defaultValue={data.idUsuario} />
            </div>
            <div>
              <Label htmlFor="vehiculo" value="Vehiculo" />
              <EnlacedSelectInput method={register} name="idCarro" required={true} values={configuredCars()} defaultValue={data.idcarro} />
            </div>
            <div>
              <Label htmlFor="covertura" value="Cobertura" />
              <EnlacedSelectInput method={register} name="idTipoCobertura" required={true} values={configuredCobertura()} defaultValue={data.idTipoCobertura}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="large" value="Fecha de entrega" />
                </div>
                <DateInput method={register} name="fechaEntrega" required={true} defaultValue={data.fechaEntrega}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="large" value="Fecha de devolución" />
                </div>
                <DateInput method={register} name="fechaDevolucion" required={true} defaultValue={data.fechaDevolucion}/>
            </div>
            <input {...register('estadoReserva')} name="estadoReserva" type="text" hidden value={'PENDIENTE'} />
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

export default ReservationModal;