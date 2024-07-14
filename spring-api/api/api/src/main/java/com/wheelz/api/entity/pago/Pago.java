package com.wheelz.api.entity.pago;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name= "pago")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    /*Por definir entidad*/
    /*@Column(name = "id_reserva")
    private long idReserva;*/
    @Column(name = "monto")
    private double monto;
    @Column(name = "fecha_pago")
    private Date fechaPago;
    @Enumerated(EnumType.STRING)
    private TipoEstadoPago tipoPago;
}
