package com.wheelz.api.dto.carro;

import com.wheelz.api.entity.carro.Carros;
import lombok.*;


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
    private Long precioDia;
    private Boolean disponibilidad;

}
