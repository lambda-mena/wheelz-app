package com.wheelz.api.dto.pago;

import com.wheelz.api.entity.pago.TipoEstadoPago;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagoResponse {
    private long id;
    private double monto;
    private Date fechaPago;
    private TipoEstadoPago tipoPago;
}
