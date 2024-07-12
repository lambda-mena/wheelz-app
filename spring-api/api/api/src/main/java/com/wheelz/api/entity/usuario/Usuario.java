package com.wheelz.api.entity.usuario;

import com.wheelz.api.entity.usuario.TipoUsuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "usuario")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido")
    private String apellido;
    private long documento;
    private String email;
    private String contraseña;
    @Enumerated(EnumType.STRING)
    private TipoUsuario customerType;
}
