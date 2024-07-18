package com.wheelz.api.dto.carro;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarrosUpdateRequestDTO {

    private String imagenes;

    @Positive(message = "El precio por día debe de ser un valor positivo.")
    private BigDecimal precioDia;

    private Boolean disponibilidad;

    public String getModelo() {
        return "modelo";
    }

    public String getMarca() {
        return "marca";
    }

    public String getAño() {
        return "año";
    }
}
