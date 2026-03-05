package com.backend_banco.models;

import jakarta.persistence.*;
import lombok.Data; 
import java.math.BigDecimal;

@Entity
@Table(name = "cuentas")
@Data
public class Cuenta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cuenta")
    private Integer idCuenta;
    
    @Column(name = "numero_cuenta", nullable = false, length = 20, unique = true)
    private String numeroCuenta;
    
    @Column(name = "tipo_cuenta", nullable = false, length = 11)
    private String tipoCuenta;
    
    @Column(name = "saldo_inicial", nullable = false, precision = 18, scale = 2)
    private BigDecimal saldoInicial;
    
    @Column(name = "estado_cuenta", nullable = false)
    private Boolean estadoCuenta;
    
    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    private Cliente cliente;
    
    @Transient
    private BigDecimal saldoActual;
}