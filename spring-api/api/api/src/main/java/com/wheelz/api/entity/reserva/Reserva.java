package com.wheelz.api.entity.reserva;

import com.wheelz.api.entity.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "reserva")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;
    /*
    @ManyToOne
    @JoinColumn(name = "id_carro", referencedColumnName = "id")
    private Carro Carro;*/

    @Column(name = "fecha_entrega")
    private long fechaEntrega;

    @Column(name = "fecha_devolucion")
    private long fechaDevolucion;

    @Column(name = "id_tipo_cobertura")
    private long idTipoCobertura;

    @Enumerated(EnumType.STRING)
    private EstadoReserva estadoReserva;

    @Column(name = "precio_total")
    private String precioTotal;
}
