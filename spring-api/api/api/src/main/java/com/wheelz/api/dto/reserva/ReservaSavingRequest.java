package com.wheelz.api.dto.reserva;

import com.wheelz.api.entity.reserva.EstadoReserva;
import com.wheelz.api.entity.reserva.TipoCobertura;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;

public class ReservaSavingRequest {
    @NotBlank(message = "El id_usuario de la reserva no puede estar vacio")
    private long id_usuario;
    @NotBlank(message = "El id_vehiculo de la reserva no puede estar vacio")
    private long id_vehiculo;
    @NotBlank(message = "La fecha de inicio de la reserva no puede estar vacio")
    private Date fecha_entrega;
    @NotBlank(message = "La fecha de devolución no puede estar vacio")
    private Date fecha_devolucion;
    @NotNull
    @Enumerated(EnumType.STRING)
    private EstadoReserva estadoReserva;
    @NotBlank(message = "El Precio Total no puede estar vacio")
    private BigDecimal precioTotal;
}
