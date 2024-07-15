package com.wheelz.api.dto.usuario;

import com.wheelz.api.entity.usuario.TipoUsuario;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioSavingRequest {
    @NotBlank(message = "El nombre no puede estar vacio")
    private String nombre;
    @NotBlank(message = "El apellido no puede estar vacio")
    private String apellido;
    @NotBlank(message = "El email no puede estar vacio")
    @Email
    private String email;
    @NotBlank(message = "La contraseña no puede estar vacio")
    private String contraseña;
    @NotNull
    private long documento;
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;
}
