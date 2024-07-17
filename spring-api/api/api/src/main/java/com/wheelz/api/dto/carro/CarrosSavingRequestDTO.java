package com.wheelz.api.dto.carro;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarrosSavingRequestDTO {

    @NotBlank(message = "La Marca es obligatoria.")
    private String marca;

    @NotBlank(message = "El modelo es obligatorio.")
    private String modelo;

    @NotBlank(message = "La placa es obligatorio.")
    private String placa;

    @NotBlank(message = "La categoría es obligatoria.")
    private String categoria;

    @NotBlank(message = "El tipo de transmisión es obligatorio.")
    private String tipoTransmision;

    @NotBlank(message = "Las imágenes son obligatorias.")
    private String imagenes;

    @NotNull(message = "El precio por día es obligatorio.")
    @Positive(message = "El precio por día debe de ser un valor positivo.")
    private Long precioDia;

    @NotNull(message = "La disponibilidad es obligatoria.")
    private Boolean disponibilidad;
}
