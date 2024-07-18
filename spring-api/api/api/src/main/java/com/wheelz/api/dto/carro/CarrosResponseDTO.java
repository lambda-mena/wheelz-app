package com.wheelz.api.dto.carro;

import lombok.*;

import java.math.BigDecimal;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarrosResponseDTO {

    private Long id;
    private String marca;
    private String modelo;
    private String categoria;
    private String tipoTransmision;
    private String imagenes;
    private BigDecimal precioDia;
    private Boolean disponibilidad;

}
