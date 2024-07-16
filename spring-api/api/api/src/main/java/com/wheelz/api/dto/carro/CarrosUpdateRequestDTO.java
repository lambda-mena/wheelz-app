package com.wheelz.api.dto.carro;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarrosUpdateRequestDTO {

    private String imagenes;

    @Positive(message = "El precio por día debe de ser un valor positivo.")
    private Long precioDia;

    private Boolean disponibilidad;
}
