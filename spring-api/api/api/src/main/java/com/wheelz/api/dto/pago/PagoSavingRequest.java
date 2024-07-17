package com.wheelz.api.dto.pago;

import com.wheelz.api.entity.pago.TipoEstadoPago;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoSavingRequest {
    @NotBlank(message = "El monto de la reserva no puede estar vacio")
    private double monto;
    @NotBlank(message = "La fecha de pago no puede estar vacio")
    private Date fechaPago;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoEstadoPago tipoPago;
}
