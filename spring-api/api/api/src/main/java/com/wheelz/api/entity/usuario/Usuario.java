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
    @Column(name = "documento", unique = true)
    private long documento;
    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "contraseña")
    private String contraseña;
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;
}
