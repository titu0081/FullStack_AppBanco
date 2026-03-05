package com.backend_banco.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "cliente")
@PrimaryKeyJoinColumn(name = "id_persona")
@Data
@EqualsAndHashCode(callSuper = true)
public class Cliente extends Persona {

    @Column(name = "password", nullable = false, length = 15)
    private String password;

    @Column(nullable = false)
    private Boolean estado;
}