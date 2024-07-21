import React from 'react'
import {TextInput , Label ,Datepicker} from 'flowbite-react'
import { Table } from '../components/Table/Table'

export default function ReservationsPage() {

  const reservationFields = ['id' , 'covertura' , 'estadoReserva' , 'fechaEntrega' , 'fechaDevolucion' , 'precioTotal'];
  const sampleReservations = [
    { id: 1, covertura: 'WRT-241', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 2, covertura: 'WRT-242', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 3, covertura: 'WRT-243', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 4, covertura: 'WRT-244', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 5, covertura: 'WRT-245', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 6, covertura: 'WRT-246', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 7, covertura: 'WRT-247', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'},
    { id: 8, covertura: 'WRT-248', estadoReserva: 'PENDIENTE', fechaEntrega: '2024-07-20T15:24:06.756Z', fechaDevolucion: '2024-07-20T15:24:06.756Z',precioTotal: '$20,000'}
  ]


  return (
      <div>
        <div className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="small" value="Reservación" />
            </div>
            <TextInput id="small" type="text" sizing="sm" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="large" value="Fecha de entrega" />
            </div>
            <Datepicker />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="large" value="Fecha de devolución" />
            </div>
            <Datepicker />
          </div>
        </div>
          <div className="overflow-x-auto">
            <Table fields={reservationFields} data={sampleReservations} onEdit={''} onDelete={''}/>
          </div>
    </div>
    
  )
}
