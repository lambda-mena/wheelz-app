package com.wheelz.api.dto.reserva;

import com.wheelz.api.entity.reserva.EstadoReserva;
import com.wheelz.api.entity.reserva.TipoCobertura;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservaSavingRequest {
    @NotBlank(message = "El id_usuario de la reserva no puede estar vacio")
    private long idUsuario;
    @NotBlank(message = "El id_vehiculo de la reserva no puede estar vacio")
    private long idCarro;
    @NotBlank(message = "La fecha de inicio de la reserva no puede estar vacio")
    private Date fechaEntrega;
    @NotBlank(message = "La fecha de devolución no puede estar vacio")
    private Date fechaDevolucion;
    @NotNull
    @Enumerated(EnumType.STRING)
    private EstadoReserva estadoReserva;
    @NotBlank(message = "El Precio Total no puede estar vacio")
    private BigDecimal precioTotal;
}
