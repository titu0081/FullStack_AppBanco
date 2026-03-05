package com.backend_banco.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "persona")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    private Integer idPersona;

    @Column(nullable = false, length = 15)
    private String nombre;

    @Column(nullable = false, length = 12)
    private String genero;

    @Column(nullable = false)
    private Integer edad;

    @Column(nullable = false)
    private Long identificacion;

    @Column(nullable = false, length = 20)
    private String direccion;

    @Column(nullable = false, length = 10)
    private String telefono;
}